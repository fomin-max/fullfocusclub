import sample from 'assets/video/own.mp4';
import mobileSample from 'assets/video/vertical.mp4';
import { ReactComponent as PageSeparator } from 'assets/img/page-separator.svg';
import { $mdBreak } from 'assets/styles/adaptive';

import { Text } from 'components';
import { useWindowSize } from 'utils';

import rightSideSrc from './assets/right-side.jpg';
import css from './landing.module.scss';

export const Landing = () => {
  const { width } = useWindowSize();
  const isMobile = width < $mdBreak;

  return (
    <div className={css.root}>
      <section className={css.top}>
        <div className={css.topInner}>
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
                  Сеть киберспортивных центров
                </Text>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={css.pageSeparatorOuter}>
        <PageSeparator />
      </div>
      <section className={css.about}>
        <Text className={css.aboutTitle} format="custom" family="cyrillic">
          <Text
            colorType="primary"
            upper
            inline
            format="inherit"
            weight="medium"
            family="latin"
          >
            Full focus
          </Text>{' '}
          — пространство, созданное для полной концентрации
        </Text>
        <div className={css.aboutContainer}>
          <div className={css.aboutContainerInner}>
            <div className={css.leftSide}>
              <Text format="m">
                Мы предоставляем максимальный комфорт, учитывая все современные
                тенденции игровой индустрии. Новейшее оборудование, вежливый
                персонал и непередаваемая атмосфера позволит вам не только
                получить максимальное удовольствие от игр, но и достичь любых
                вершин в киберспортивном мире. Наши клубы имеют фирменный
                интерьер, который разработан с учетом сочетания эргономичности и
                эффектности. Мы уделяем особое внимание удобству каждого гостя,
                для этого все игровые места оборудованы профессиональной
                периферией и железом, которое позволит вам играть в любые игры
                на максимальных настройках.
              </Text>
            </div>
            <div className={css.rightSide}>
              <img src={rightSideSrc} alt="Full Focus club" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
