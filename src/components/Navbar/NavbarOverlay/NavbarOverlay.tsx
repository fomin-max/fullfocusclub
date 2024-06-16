import * as React from 'react';
import { Link } from 'react-scroll';
import cn from 'classnames';

import { Text } from 'components';
import { LINK_ID, LINKS } from 'components/Navbar';

import css from './navbar-overlay.module.scss';

interface IProps {
  onClick: VoidFunction;
  isOpened: boolean;
}

export const NavbarOverlay = ({ isOpened, onClick }: IProps) => (
  <nav className={cn(css.root, isOpened ? css.opened : css.closed)}>
    <ul className={css.menu}>
      {[...LINKS]
        .sort((a) => (a.id === LINK_ID.franchise ? -1 : 1))
        .map(({ id, name }) => (
          <li key={id}>
            <Link
              // TODO: activeClass?
              // activeClass={css.active}
              smooth
              spy
              to={id}
              onClick={onClick}
            >
              <Text weight="medium" upper colorType="link">
                {name}
              </Text>
            </Link>
          </li>
        ))}
    </ul>
  </nav>
);
