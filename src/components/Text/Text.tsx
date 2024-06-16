import React from 'react';
import cn from 'classnames';

import { TTextColorTypes } from './types';

import css from './text.module.scss';

type HTMLProps = HTMLTitleElement | HTMLDivElement | HTMLParagraphElement;

interface IProps extends React.AllHTMLAttributes<HTMLProps> {
  type?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'li';
  upper?: boolean;
  clickable?: boolean;
  inline?: boolean;
  align?: 'left' | 'center' | 'right' | 'inherit';
  weight?: 'normal' | 'medium' | 'bold';
  decoration?: 'none' | 'underline' | 'line_through';

  format?: 'inherit' | 'xs' | 's' | 'm' | 'l' | 'xl';

  colorType?: TTextColorTypes;
}

/**
 * format:
 * `xs` - 12;
 * `s` - 16 (default);
 * `m` - 22 (mediaMaxSm 18);
 * `l` - 30 (mediaMaxSm 24);
 * `xl` - 40 (mediaMaxSm 30);
 */

export const Text = ({
  type = 'div',
  upper,
  clickable,
  inline,
  align = 'left',
  weight = 'normal',
  decoration,
  format = 's',
  colorType,
  children,
  className,
  ...rest
}: IProps) => {
  const classes = cn(
    css.root,
    format && css[`format-${format}`],
    weight && css[`weight-${weight}`],
    decoration && css[`decoration-${decoration}`],
    align && css[`align-${align}`],
    upper && css.uppercase,
    inline && css.inline,
    clickable && css.clickable,
    colorType && css[`colorType-${colorType}`],
    className
  );

  return React.createElement(
    type || 'div',
    { className: classes, ...rest },
    children
  );
};
