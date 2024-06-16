import React from 'react';
import cn from 'classnames';

import { Loader } from 'components';
import { BUTTON_VARIANT } from './consts';
import { TButtonVariants } from './types';

import css from './button.module.scss';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TButtonVariants;
  disabled?: boolean;
  loading?: boolean;
}

export const Button = ({
  variant = BUTTON_VARIANT.primary,
  children,
  onClick,
  loading,
  disabled,
  ...rest
}: IButtonProps) => {
  const classes = cn(css.button, css[variant]);

  const props = {
    className: classes,
    disabled: disabled || loading,
    onClick: loading || disabled ? undefined : onClick,
    ...rest,
  };

  return React.createElement(
    'button',
    { ...props, type: 'button' },
    loading ? <Loader /> : children
  );
};
