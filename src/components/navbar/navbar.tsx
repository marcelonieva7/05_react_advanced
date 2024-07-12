import { type FC, type HTMLAttributes } from 'react';
import { ProfileNav } from '../profileNav/profileNav';
import { AppRoutes } from 'libs/router/appRoutes';
import { Link } from 'react-router-dom';
import briefcase from 'assets/images/briefcase.svg'

import styles from './styles/navbar.module.css';
import navlinkStyles from './styles/navlink.module.css';

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
  'data-test-id'?: string;
}

interface NavLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  to: string;
  'data-test-id'?: string;
  title: string;
}

const NavLink: FC<NavLinkProps> = ({ to, title, 'data-test-id': dataTestId, children, className, ...props }) => {
  return (
    <li className={navlinkStyles.navHeader__item} title={title}>
      <Link data-test-id={dataTestId} to={to} className={[navlinkStyles.navHeader__inner, className].join(' ')} {...props}>
        <span className="visually-hidden">{title}</span>
        {children}
      </Link>
    </li>
  );
};

const Navbar: FC<NavbarProps> = ({ 'data-test-id': dataTestId, className, ...props }) => {
  return (
    <nav data-test-id={dataTestId} className={[styles.header__nav, className].join(' ')} {...props}>
      <ul className={styles.navHeader__list}>
        <NavLink data-test-id="header-bookings-link" to={AppRoutes.BOOKINGS} title="Bookings">
          <img src={briefcase} alt="bookings" />
        </NavLink>
        <li className={navlinkStyles.navHeader__item} title="Profile">
          <ProfileNav data-test-id='header-profile-nav' />
        </li>
      </ul>
    </nav>
  );
};

export { Navbar, NavLink };
