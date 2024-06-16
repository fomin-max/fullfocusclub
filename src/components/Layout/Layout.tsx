import { ReactNode } from 'react';

import { Footer, Navbar } from 'components';

import css from './layout.module.scss';

interface IProps {
  children?: ReactNode;
}

export const Layout = ({ children }: IProps) => {
  return (
    <>
      <div className={css.background} />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};
