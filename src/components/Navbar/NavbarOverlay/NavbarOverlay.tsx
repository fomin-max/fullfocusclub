import * as React from 'react';
import { Link } from 'react-scroll';
import cn from 'classnames';

import { Text } from 'components';
import { LINK_ID, LINKS } from 'components/Navbar';
import { HEADER_HEIGHT } from 'utils';

import css from './navbar-overlay.module.scss';

interface IProps {
  onClick: VoidFunction;
  isOpened: boolean;
  isMediumWidth: boolean;
}

export const NavbarOverlay = ({ isOpened, onClick, isMediumWidth }: IProps) => {
  const handleFranchise = () => {
    alert(
      'Связаться с нами можно по следующим видам связи:\nemail: info@fullfocusclub.ru\nтелефон: +7 (812) 660-52-69\nтелеграмм: @fullfocusclub'
    );
    onClick();
  };

  return (
    <nav className={cn(css.root, isOpened ? css.opened : css.closed)}>
      <ul className={css.menu}>
        {[...LINKS]
          .sort((a) => (a.id === LINK_ID.franchise ? -1 : 1))
          .map(({ id, name }) => (
            <li key={id}>
              <Link
                activeClass={css.active}
                offset={isMediumWidth ? -HEADER_HEIGHT + 50 : -HEADER_HEIGHT} // 50 - padding
                smooth
                spy
                to={id}
                onClick={id === LINK_ID.franchise ? handleFranchise : onClick}
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
};
