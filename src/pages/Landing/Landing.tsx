import sample from 'assets/video/own.mp4';

import css from './landing.module.scss';

export const Landing = () => (
  <div className={css.root}>
    <video className={css.bgVideo} autoPlay={false} loop muted>
      <source src={sample} type="video/mp4" />
    </video>
  </div>
);
