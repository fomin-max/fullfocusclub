import sample from 'assets/video/own.mp4';
import mobileSample from 'assets/video/vertical.mp4';
import { $mdBreak } from 'assets/styles/adaptive';

import { Text } from 'components';
import { useWindowSize } from 'utils';

import css from './landing.module.scss';

export const Landing = () => {
  const { width } = useWindowSize();
  const isMobile = width < $mdBreak;

  return (
    <div className={css.root}>
      <section className={css.top}>
        <div
          className={css.media}
          dangerouslySetInnerHTML={{
            __html: `
              <video
                loop
                muted
                autoplay
                playsinline
                src="${isMobile ? mobileSample : sample}"
                class="${css.bgVideo}"
                type="video/mp4"
              />,
      `,
          }}
        />
        <div className={css.content}>
          <div className={css.title}>
            Full
            <br />
            Focus
            <div className={css.subtitle}>
              <Text format="xl" weight="medium" upper>
                Сеть киберспортивных клубов
              </Text>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
