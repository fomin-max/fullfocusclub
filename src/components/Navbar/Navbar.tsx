import * as React from 'react';
import { Link, scroller } from 'react-scroll';

import { Button, Text } from 'components';
import { BRAND_URL, useWindowSize } from 'utils';
import { $smBreak } from 'assets/styles/adaptive';
import { ReactComponent as FullLogo } from 'assets/img/full-logo.svg';
import { ReactComponent as ShortLogo } from 'assets/img/short-logo.svg';
import { Hamburger } from './Hamburger';
import { NavbarOverlay } from './NavbarOverlay';
import { LINK_ID, LINKS } from './consts';

import css from './navbar.module.scss';

export const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = React.useState(false);
  const { width } = useWindowSize();

  const handleGoToFranchise = () => {
    scroller.scrollTo(LINK_ID.franchise, {});
  };

  const isSmallWidth = width < $smBreak;

  const toggleNavbarState = () => setIsNavbarOpen((prevState) => !prevState);

  return (
    <>
      <header className={css.header}>
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
                  <Link activeClass={css.active} smooth spy to={id}>
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
