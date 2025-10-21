// src/utils/outlineToMarkdown.ts
export type TocItem = { id: string; text: string; level: 'h2' | 'point' };

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/["'(),.:;«»]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

export const pointId = (num: string) => `p-${num.replace(/\./g, '-')}`;

/** защищаем юридические конструкции от разрыва */
export function protectPhrases(s: string) {
  return s
    .replace(
      /\(далее\s*[–-]\s*«([^»]+)»\)/gi,
      (_m, p1) => `(далее\u00A0–\u00A0«${p1}»)`
    )
    .replace(/№\s+(\d+)/g, '№\u00A0$1')
    .replace(/(\d)-(фз)/gi, '$1\u2011$2')
    .replace(/(\d)\s+г\./g, '$1\u00A0г.')
    .replace(/ст\.\s+(\d+)/gi, 'ст.\u00A0$1');
}

/** Главная функция конверсии */
export function outlineToMarkdown(input: string): {
  markdown: string;
  toc: TocItem[];
} {
  // 0) нормализация сырья из PDF
  const text = protectPhrases(input)
    .replace(/\r/g, '')
    .replace(/[\t ]+/g, ' ')
    // перенос перед 1. / 1.1. / 1.1.1.
    .replace(/(?<!^)\s(?=(\d+(?:\.\d+)*\.)\s)/g, '\n')
    // перенос перед буллитами -, —, –, •, ●
    .replace(/(?<!^)\s(?=[–—•●\-]\s?)/g, '\n')
    // если маркер без пробела — добавим его
    .replace(/(^|\n)([–—•●])(?!\s)/g, '$1$2 ')
    // встроенные точки/буллиты превращаем в маркеры списка
    .replace(/(^|[^\S\n\r])[•●]\s*/g, '\n- ')
    .trim();

  const lines = text
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);

  // Регексы
  const numRe = /^(\d+(?:\.\d+)*)\.\s*(.*)$/; // 1. / 1.1. / 1.1.1.
  const bulletRe = /^[–—\-]\s+(.*)$/; // - / — / –
  const isSection = (l: string) => /^\d+\.\s+\S/.test(l);
  const isPointL1 = (l: string) => /^\d+\.\d+\.\s+\S/.test(l);

  const toc: TocItem[] = [];
  const md: string[] = [];

  // Состояние текущего нумерованного пункта
  let currentDepth = 0; // глубина 1 / 2 / 3
  let itemBuffer: string[] = []; // накапливаем текст текущего li
  let depthStack: number[] = []; // стек глубин для вложенности

  const flushItem = (depth: number | 0) => {
    if (itemBuffer.length === 0) {
      return;
    }
    const indent = '   '.repeat(depth - 1);
    // первый параграф — заголовок пункта; остальные — как обычные строки
    const [first, ...rest] = itemBuffer;
    md.push(`${indent}1. ${first}`);
    rest.forEach((p) => {
      // абзац внутри li
      md.push(`${indent}   ${p}`);
    });
    itemBuffer = [];
  };

  const ensureDepth = (nextDepth: number) => {
    if (currentDepth === 0) {
      currentDepth = nextDepth;
      depthStack = [nextDepth];
      return;
    }
    if (nextDepth === currentDepth) {
      return;
    }
    if (nextDepth > currentDepth) {
      // погружаемся на уровень
      currentDepth = nextDepth;
      depthStack.push(nextDepth);
      return;
    }
    // поднимаемся — перед сменой уровня сливаем текущий пункт
    flushItem(currentDepth);
    while (
      depthStack.length > 0 &&
      depthStack[depthStack.length - 1] > nextDepth
    ) {
      depthStack.pop();
    }
    currentDepth = nextDepth;
  };

  for (const raw of lines) {
    // H2 "1. ОБЩИЕ ПОЛОЖЕНИЯ"
    if (isSection(raw)) {
      // закрываем возможный незавершённый li
      if (currentDepth) {
        flushItem(currentDepth);
        currentDepth = 0;
        depthStack = [];
      }
      const id = slugify(raw);
      md.push(`\n## ${raw}\n`);
      toc.push({ id, text: raw, level: 'h2' });
      continue;
    }

    // Нумерованный пункт
    const nm = raw.match(numRe);
    if (nm) {
      const num = nm[1];
      const rest = nm[2];
      const depth = num.split('.').length;

      // В TOC учитываем только 1-й уровень под H2: 1.1, 1.2 …
      if (isPointL1(raw)) {
        toc.push({ id: pointId(num), text: `${num} ${rest}`, level: 'point' });
      }

      // Переходим на нужную глубину, предварительно сливая предыдущий пункт
      if (currentDepth) {
        flushItem(currentDepth);
      }
      ensureDepth(depth);
      // начинаем новый пункт: кладём заголовок пункта в буфер
      itemBuffer = [rest];
      continue;
    }

    // Буллит — остаётся внутри текущего пункта как подсписок
    const bm = raw.match(bulletRe);
    if (bm) {
      // если пункта ещё нет, трактуем как параграф
      if (!currentDepth) {
        md.push(`- ${bm[1]}`);
        continue;
      }
      // внутри li представим буллит отдельной строкой с "- " и правильным отступом
      const indent = '   '.repeat(currentDepth - 1);
      md.push(`${indent}- ${bm[1]}`);
      continue;
    }

    // Обычный текст — это часть текущего пункта
    if (currentDepth) {
      itemBuffer.push(raw);
    } else {
      md.push(raw);
    }
  }

  // финальный слив
  if (currentDepth) {
    flushItem(currentDepth);
  }

  return { markdown: md.join('\n'), toc };
}
