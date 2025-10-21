import { Helmet } from 'react-helmet-async';

import css from './DocumentLayout.module.scss';

interface IProps {
  title: string | React.ReactNode;
  updatedAt?: string; // например: "«17» октября 2025 г."
  children: React.ReactNode;
}

export const DocumentLayout = ({ title, updatedAt, children }: IProps) => {
  const pageTitle =
    typeof title === 'string'
      ? title
      : 'Политика обработки персональных данных';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={css.wrap}>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="robots" content="index, follow" />
      </Helmet>

      <article className={css.root}>
        <header>
          <h1 className={css.title}>{title}</h1>
          {updatedAt && (
            <p className={css.updated}>Последнее обновление: {updatedAt}</p>
          )}
        </header>

        <div className={css.body}>{children}</div>

        <footer className={css.footer}>
          <button type="button" onClick={handlePrint} className={css.printBtn}>
            Печать / PDF
          </button>
          <button type="button" onClick={scrollToTop} className={css.topLink}>
            Наверх ↑
          </button>
        </footer>
      </article>
    </div>
  );
};
