import * as React from 'react';
import { Link, scroller } from 'react-scroll';
import { useNavigate } from 'react-router';
import cn from 'classnames';

import { Button, Text, TLinkIds } from 'components';
import {
  APP_URLS,
  BRAND_URL,
  HEADER_HEIGHT,
  useWindowScroll,
  useWindowSize,
} from 'utils';
import { $mdBreak, $smBreak } from 'assets/styles/adaptive';
import { ReactComponent as FullLogo } from 'assets/img/full-logo.svg';
import { ReactComponent as ShortLogo } from 'assets/img/short-logo.svg';
import { Hamburger } from './Hamburger';
import { NavbarOverlay } from './NavbarOverlay';
import { LINK_ID, LINKS } from './consts';

import css from './navbar.module.scss';

export const Navbar = () => {
  const navigate = useNavigate();
  const [isNavbarOpen, setIsNavbarOpen] = React.useState(false);

  const [hidden, setHidden] = React.useState(false);
  const lastScrollRef = React.useRef(0);

  const { width } = useWindowSize();
  const { scrollY } = useWindowScroll(); // у тебя уже есть
  const isSmallWidth = width < $smBreak;
  const isMediumWidth = width < $mdBreak;
  const duration = 400;

  // следим за направлением скролла и прячем/показываем
  React.useEffect(() => {
    const current = Math.max(scrollY, 0);
    const prev = lastScrollRef.current;
    const delta = Math.abs(current - prev);

    // не дёргаем шапку при мелких движениях
    if (delta > 8) {
      const goingDown = current > prev;
      // скрываем только если вниз И уже ушли достаточно от верха
      if (!isNavbarOpen) {
        setHidden(goingDown && current > HEADER_HEIGHT + 40);
      } else {
        // когда открыт бургер — никогда не скрываем
        setHidden(false);
      }
      lastScrollRef.current = current;
    }

    // в самом верху всегда показываем
    if (current < 20 && hidden) {
      setHidden(false);
    }
  }, [scrollY, isNavbarOpen, hidden]);

  const handleGoToFranchise = () => {
    alert(
      'Связаться с нами можно по следующим видам связи:\nemail: info@fullfocusclub.ru\nтелеграмм: @fullfocusclub'
    );
    scroller.scrollTo(LINK_ID.franchise, {});
  };

  const toggleNavbarState = () => setIsNavbarOpen((s) => !s);

  const handleGoToLanding = (id: TLinkIds) => {
    navigate(APP_URLS.Landing);
    scroller.scrollTo(id, {});
  };

  return (
    <>
      <header
        className={cn(
          css.header,
          css.headerWithBg,
          hidden && css.headerHidden // 👈 добавили класс
        )}
      >
        <div className={css.container}>
          <a href={BRAND_URL}>
            {isSmallWidth ? (
              <ShortLogo className={css.logo} />
            ) : (
              <FullLogo className={css.logo} />
            )}
          </a>
          <ul className={css.menu}>
            {LINKS.map(({ id, name }) => {
              if (id === LINK_ID.franchise) {
                return (
                  <li key={id}>
                    <Button variant="offer" onClick={handleGoToFranchise}>
                      <Text weight="medium" upper>
                        {name}
                      </Text>
                    </Button>
                  </li>
                );
              }
              return (
                <li key={id}>
                  <Link
                    activeClass={css.active}
                    offset={-HEADER_HEIGHT}
                    smooth
                    spy
                    to={id}
                    duration={duration}
                    onClick={
                      id === LINK_ID.contacts
                        ? () => handleGoToFranchise()
                        : () => handleGoToLanding(id)
                    }
                  >
                    <Text weight="medium" upper colorType="link">
                      {name}
                    </Text>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Hamburger onClick={toggleNavbarState} isOpened={isNavbarOpen} />
        </div>
      </header>

      <NavbarOverlay
        onClick={toggleNavbarState}
        isOpened={isNavbarOpen}
        isMediumWidth={isMediumWidth}
      />
    </>
  );
};
