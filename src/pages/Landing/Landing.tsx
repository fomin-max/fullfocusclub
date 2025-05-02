import { Element } from 'react-scroll';

import sample from 'assets/video/foreign.mp4';
import mobileSample from 'assets/video/vertical.mp4';
import { ReactComponent as PageSeparator } from 'assets/img/page-separator.svg';
import { $mdBreak } from 'assets/styles/adaptive';

import { Text, LINK_ID } from 'components';
import { useWindowSize } from 'utils';
import { useMemo } from 'react';
import { MasonryGallery } from '../../components/MasonryGallery';

import rightSideSrc from './assets/right-side.jpg';
import { ReactComponent as AirConditioning } from './assets/icons/air-conditioning.svg';
import { ReactComponent as Devices } from './assets/icons/devices.svg';
import { ReactComponent as Accounts } from './assets/icons/accounts.svg';
import { ReactComponent as Food } from './assets/icons/food.svg';
import { ReactComponent as Gamepad } from './assets/icons/gamepad.svg';
import { ReactComponent as Hardware } from './assets/icons/hardware.svg';
import { ReactComponent as Internet } from './assets/icons/internet.svg';
import { ReactComponent as Chair } from './assets/icons/chair.svg';

import css from './landing.module.scss';

const BENEFITS = [
  {
    text: 'Новейшее железо и\u00A0грамотно настроенные ПК',
    icon: <Hardware />,
  },
  {
    text: 'Флагманская периферия от Logitech, SteelSeries и HyperX',
    icon: <Devices />,
  },
  {
    text: 'Высокоскоростной интернет от SkyNet',
    icon: <Internet />,
  },
  {
    text: 'Просторные столы и игровые кресла от WARP и Knight',
    icon: <Chair />,
  },
  {
    text: 'Системы кондиционирования в каждой зоне',
    icon: <AirConditioning />,
  },
  {
    text: 'Клубные аккаунты с\u00A0огромным количеством игр',
    icon: <Accounts />,
  },
  {
    text: 'Большой ассортимент бара и доставка еды от наших партнеров',
    icon: <Food />,
  },
  {
    text: 'Лаунж пространства с PS5',
    icon: <Gamepad />,
  },
];

export const Landing = () => {
  const { width } = useWindowSize();
  const isMobile = width < $mdBreak;

  const sourceVideo = useMemo(
    () => (isMobile ? mobileSample : sample),
    [isMobile]
  );

  return (
    <div className={css.root}>
      <section className={css.top}>
        <div className={css.topInner}>
          <div
            className={css.media}
            dangerouslySetInnerHTML={{
              __html: `
                <video
                  id='bg-video'
                  loop='loop'
                  muted='muted'
                  autoplay='autoplay'
                  preload='auto'
                  class="${css.bgVideo}"
                >
                  <source src="${sourceVideo}" type="video/mp4">
                </video>
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
        </div>
      </section>
      <div className={css.pageSeparatorOuter}>
        <PageSeparator />
      </div>
      <Element name={LINK_ID.about}>
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
            —&nbsp;пространство, созданное для полной концентрации
          </Text>
          <div className={css.aboutContainer}>
            <div className={css.aboutContainerInner}>
              <div className={css.leftSide}>
                <Text format="xl">
                  Киберспортивные пространства нового поколения
                </Text>
                <br />
                <Text format="m">
                  Мы предоставляем максимальный комфорт, учитывая все
                  современные тенденции игровой индустрии. Новейшее
                  оборудование, вежливый персонал и непередаваемая атмосфера
                  позволит вам не только получить максимальное удовольствие от
                  игр, но и достичь любых вершин в киберспортивном мире. <br />
                  <br /> Наши клубы имеют фирменный интерьер, который разработан
                  с учетом сочетания эргономичности и эффектности. Мы уделяем
                  особое внимание удобству каждого гостя, для этого все игровые
                  места оборудованы профессиональной периферией и железом,
                  которое позволит вам играть в любые игры на максимальных
                  настройках.
                </Text>
              </div>
              <div className={css.rightSide}>
                <img src={rightSideSrc} alt="Full Focus club" />
              </div>
            </div>
          </div>
          <div className={css.benefits}>
            {BENEFITS.map(({ icon, text }) => (
              <div className={css.benefit} key={text}>
                {icon}
                <Text format="m" align="center">
                  {text}
                </Text>
              </div>
            ))}
          </div>
          <MasonryGallery />
        </section>
      </Element>
    </div>
  );
};
