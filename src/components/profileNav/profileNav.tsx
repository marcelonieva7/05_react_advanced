import { type FC, type HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '@/libs/router/appRoutes';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Button } from '../button/button';
import { authActions } from '@/libs/redux/slices/auth';
import userImg from '@/assets/images/user.svg'

import styles from './styles/profilenav.module.css';
import stylesBtn from '@/components/button/styles/button.module.css'
import stylesNavLink from '@/components/navbar/styles/navlink.module.css'

interface ProfileNavProps extends HTMLAttributes<HTMLDivElement> {
  'data-test-id'?: string;
}

const ProfileNav: FC<ProfileNavProps> = ({ 'data-test-id': dataTestId, className, ...props }) => {
  const { user } = useAppSelector(({ auth }) => auth);
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(authActions.signOut());
  }

  return (
    <div data-test-id={dataTestId} className={[stylesNavLink.navHeader__inner, styles.profileNav, className].join(' ')} tabIndex={0} {...props}>
      <span className="visually-hidden">Profile</span>
      <img src={userImg} alt="profile" />
      <ul data-test-id="header-profile-nav-list" className={styles.profileNav__list}>
        {user ? (
          <>
          <li data-test-id="header-profile-nav-username" className={styles.profileNav__item}>
            {user.fullName}
          </li>
          <li className={styles.profileNav__item}>
            <Button data-test-id="header-profile-nav-sign-out" className={styles.profileNav__signOut} onClick={handleSignOut}>
              Sign Out
            </Button>
          </li>
          </>
        ) : (
          <>
          <li className={styles.profileNav__item}>
            <Link data-test-id="header-profile-nav-sign-in" to={AppRoutes.SIGN_IN} className={[styles.profileNav__signOut, stylesBtn.button].join(' ')}>
              Sign In
            </Link>
          </li>
          <li className={styles.profileNav__item}>
            <Link data-test-id="header-profile-nav-sign-up" to={AppRoutes.SIGN_UP} className={[styles.profileNav__signOut, stylesBtn.button].join(' ')}>
              Sign Up
            </Link>
          </li>
          </>
        )}
      </ul>
    </div>
  );
};

export { ProfileNav };
