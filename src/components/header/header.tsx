import { type FC, type HTMLAttributes } from 'react';
import { Navbar } from '@/components/navbar/navbar';
import { AppRoutes } from '@/libs/router/appRoutes';
import { Link } from 'react-router-dom';

import styles from './styles/header.module.css';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  'data-test-id'?: string;
}

const Header: FC<HeaderProps> = ({ 'data-test-id': dataTestId, className, ...props }) => {
  return (
    <header data-test-id={dataTestId} className={[styles.header, className].join(' ')} {...props}>
      <div className={styles.header__inner}>
        <Link data-test-id="header-logo" to={AppRoutes.HOME} className={styles.header__logo}>
          Travel App
        </Link>
        <Navbar data-test-id='header-nav' />
      </div>
    </header>
  );
};

export { Header };
