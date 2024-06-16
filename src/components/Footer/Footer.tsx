import { APP_NAME } from '../../utils';

import css from './footer.module.scss';

export const Footer = () => (
  <footer className={css.footer}>
    <div className={css.content}>
      {`Copyright © ${new Date().getFullYear()} ${APP_NAME}.ru`}
    </div>
  </footer>
);
