import cn from 'classnames';

import css from './hamburger.module.scss';

interface IProps {
  onClick: VoidFunction;
  isOpened: boolean;
}

export const Hamburger = ({ onClick, isOpened }: IProps) => (
  <div
    className={cn(css.root, css.top0, css.right0, css.w10, css.h10)}
    onClick={onClick}
  >
    <div
      className={cn(
        css.absolute,
        css.w5,
        css.transform,
        css['translate-x-50'],
        css['translate-y-50'],
        css['left-50'],
        css['top-50']
      )}
    >
      <span
        className={cn(
          css.absolute,
          css['h0.5'],
          css.w5,
          css.bgWhite,
          css.transform,
          css.transition,
          css.duration300,
          css.easeInOut,
          isOpened ? [css.rotate45up, css.delay200] : css['translate-y-375']
        )}
      />
      <span
        className={cn(
          css.absolute,
          css['h0.5'],
          css.bgWhite,
          css.transform,
          css.transitionAll,
          css.duration200,
          css.easeInOut,
          isOpened
            ? [css.w0, css.opacity50]
            : [css.w5, css.delay200, css.opacity100]
        )}
      />
      <span
        className={cn(
          css.absolute,
          css['h0.5'],
          css.w5,
          css.bgWhite,
          css.transform,
          css.transition,
          css.duration300,
          css.easeInOut,
          isOpened ? [css.rotate45, css.delay200] : css['translate-y-375-up']
        )}
      />
    </div>
  </div>
);
