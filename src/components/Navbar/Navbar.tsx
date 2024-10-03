import * as React from 'react';
import { Link, scroller } from 'react-scroll';

import { Button, Text } from 'components';
import {
  BRAND_URL,
  HEADER_HEIGHT,
  useWindowScroll,
  useWindowSize,
} from 'utils';
import { $mdBreak, $smBreak } from 'assets/styles/adaptive';
import { ReactComponent as FullLogo } from 'assets/img/full-logo.svg';
import { ReactComponent as ShortLogo } from 'assets/img/short-logo.svg';
import cn from 'classnames';
import { Hamburger } from './Hamburger';
import { NavbarOverlay } from './NavbarOverlay';
import { LINK_ID, LINKS } from './consts';

import css from './navbar.module.scss';

export const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = React.useState(false);
  const { width } = useWindowSize();
  const { scrollY } = useWindowScroll();
  const mobileLandingHeight = 500;
  const isSmallWidth = width < $smBreak;
  const isMediumWidth = width < $mdBreak;
  const duration = 400;

  const isScrolledToBottom =
    scrollY >
    (isMediumWidth ? mobileLandingHeight : window.innerHeight) - HEADER_HEIGHT;

  const handleGoToFranchise = () => {
    alert(
      'Связаться с нами можно по следующим видам связи:\nemail: info@fullfocusclub.ru\nтелефон: +7 (812) 660-52-69\nтелеграмм: @fullfocusclub'
    );
    scroller.scrollTo(LINK_ID.franchise, {});
  };

  const toggleNavbarState = () => setIsNavbarOpen((prevState) => !prevState);

  return (
    <>
      <header
        className={cn(
          css.header,
          isScrolledToBottom && !isNavbarOpen && css.headerWithBg
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
      <NavbarOverlay onClick={toggleNavbarState} isOpened={isNavbarOpen} />
    </>
  );
};
