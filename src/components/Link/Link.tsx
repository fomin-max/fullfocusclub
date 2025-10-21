import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import css from './Link.module.scss';

interface IProps {
  url: string;
  children: React.ReactNode;
}

export const Link = ({ url, children }: IProps) => {
  return (
    <RouterLink className={css.root} to={url}>
      {children}
    </RouterLink>
  );
};
