import { type FC, type HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from 'libs/router/appRoutes';
import user from 'assets/images/user.svg'

import styles from './styles/profilenav.module.css';
import stylesBtn from 'components/button/styles/button.module.css'
import stylesNavLink from 'components/navbar/styles/navlink.module.css'

interface ProfileNavProps extends HTMLAttributes<HTMLDivElement> {
  'data-test-id'?: string;
}

const ProfileData = {
  name: "John Doe"
}

const ProfileNav: FC<ProfileNavProps> = ({ 'data-test-id': dataTestId, className, ...props }) => {
  return (
    <div data-test-id={dataTestId} className={[stylesNavLink.navHeader__inner, styles.profileNav, className].join(' ')} tabIndex={0} {...props}>
      <span className="visually-hidden">Profile</span>
      <img src={user} alt="profile" />
      <ul data-test-id="header-profile-nav-list" className={styles.profileNav__list}>
        <li data-test-id="header-profile-nav-username" className={styles.profileNav__item}>
          {ProfileData.name}
        </li>
        <li className={styles.profileNav__item}>
          <Link data-test-id="header-profile-nav-sign-out" to={AppRoutes.SIGN_IN} className={[styles.profileNav__signOut, stylesBtn.button].join(' ')}>
            Sign Out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export { ProfileNav };
