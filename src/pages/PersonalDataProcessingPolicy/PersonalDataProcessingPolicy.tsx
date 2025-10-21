import { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import { DocumentLayout } from 'components';
import css from './PersonalDataProcessingPolicy.module.scss';

/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */

/* === helpers === */

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[!"(),.:;?«»]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const pointId = (num: string) => `p-${num.replace(/\./g, '-')}`;

const snippet = (s: string, max = 90) => {
  const t = s.replace(/\s+/g, ' ').trim();
  if (t.length <= max) {
    return t;
  }
  const cut = t
    .slice(0, max)
    .replace(/[,.:;–—-]\s*\S*?$/, '')
    .replace(/\s+\S*$/, '');
  return `${(cut || t.slice(0, max)).trim()}…`;
};

// первый текстовый узел (mdast)
const firstText = (node: any): string => {
  if (!node) {
    return '';
  }
  if (node.type === 'text' && typeof node.value === 'string') {
    return node.value;
  }
  const ch = Array.isArray(node.children) ? node.children : [];
  for (const c of ch) {
    const t = firstText(c);
    if (t) {
      return t;
    }
  }
  return '';
};

const POINT_RE = /^(\d+(?:\.\d+)*)\.\s/;

/* === react-markdown components === */

const mdComponents: Components = {
  li({ node, children, ...props }) {
    const m = POINT_RE.exec(firstText(node as any));
    const id = m ? pointId(m[1]) : undefined;
    return (
      <li id={id} {...props}>
        {children}
      </li>
    );
  },
  // fallback: если пункт размечен параграфом — тоже повесим id
  p({ node, children, ...props }) {
    const m = POINT_RE.exec(firstText(node as any));
    const id = m ? pointId(m[1]) : undefined;
    return id ? (
      <p id={id} {...props}>
        {children}
      </p>
    ) : (
      <p {...props}>{children}</p>
    );
  },
};

/* === types === */

type TocH2 = { level: 'h2'; id: string; text: string };
type TocPoint = {
  level: 'point';
  id: string;
  num: string;
  label: string;
  parent: string;
};
type TocItem = TocH2 | TocPoint;

const isTocPoint = (x: TocItem): x is TocPoint => x.level === 'point';

/* === component === */

export const PersonalDataProcessingPolicy = () => {
  const [md, setMd] = useState('');
  const [err, setErr] = useState<string | null>(null);

  // при заходе на страницу — вернуть скролл в начало (один раз)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // загрузка markdown из public
  useEffect(() => {
    const url = `${process.env.PUBLIC_URL || ''}/docs/personal-data-policy.md`;
    const ac = new AbortController();
    (async () => {
      try {
        const r = await fetch(url, { cache: 'reload', signal: ac.signal });
        if (!r.ok) {
          throw new Error(`HTTP ${r.status} ${r.statusText || ''}`.trim());
        }
        setMd(await r.text());
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        setErr(error instanceof Error ? error.message : String(error));
      }
    })();
    return () => ac.abort();
  }, []);

  // TOC: идём по строкам MD в исходном порядке; подпункты группируем под текущим h2
  const toc: TocItem[] = useMemo(() => {
    if (!md) {
      return [];
    }
    const items: TocItem[] = [];
    let currentH2: TocH2 | null = null;

    for (const line of md.split(/\n+/)) {
      const h2m = line.match(/^##\s+(.+?)\s*$/);
      if (h2m) {
        const text = h2m[1].trim();
        currentH2 = { level: 'h2', id: slugify(text), text };
        items.push(currentH2);
        continue;
      }
      const pm = line.match(/^ {0,3}(\d+(?:\.\d+)*)\.\s+(.+?)\s*$/);
      if (pm && currentH2) {
        const num = pm[1];
        // берём только уровень 1.x (два сегмента)
        if (num.split('.').length === 2) {
          items.push({
            level: 'point',
            id: pointId(num),
            num,
            label: pm[2].trim(),
            parent: currentH2.id,
          });
        }
      }
    }
    return items;
  }, [md]);

  return (
    <DocumentLayout
      title="ПОЛИТИКА В ОТНОШЕНИИ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ"
      updatedAt="«17» октября 2025 г."
    >
      <div className={css.layout}>
        {/* TOC */}
        <nav className={css.toc} aria-label="Оглавление">
          <div className={css.tocTitle}>Содержание</div>
          <ul>
            {toc.map((it) =>
              it.level === 'h2' ? (
                <li key={it.id} className={css.tocH2}>
                  <a href={`#${it.id}`}>{it.text}</a>
                  {toc.some(
                    (p) => p.level === 'point' && p.parent === it.id
                  ) && (
                    <ul className={css.tocSub}>
                      {toc
                        .filter(
                          (p): p is TocPoint =>
                            isTocPoint(p) && p.parent === it.id
                        )
                        .map((p) => (
                          <li key={p.id} className={css.tocPoint}>
                            <a
                              href={`#${p.id}`}
                              title={`${p.num} ${p.label}`.trim()}
                            >
                              <span className={css.tocNum}>{p.num}</span>
                              <span className={css.tocLabel}>
                                {snippet(p.label)}
                              </span>
                            </a>
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              ) : null
            )}
          </ul>
        </nav>

        {/* Контент */}
        <div className={css.content}>
          {err && <p role="alert">Не удалось загрузить документ: {err}</p>}
          {!md && !err && <p>Загрузка…</p>}
          {md && (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: 'append' }],
              ]}
              components={mdComponents}
            >
              {md}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </DocumentLayout>
  );
};
