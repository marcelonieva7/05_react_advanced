import { type FC, type HTMLAttributes } from 'react';
import heart from 'assets/images/heart.svg'

import styles from './styles/footer.module.css';

interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  'data-test-id'?: string;
}

const Footer: FC<FooterProps> = ({ 'data-test-id': dataTestId, className, ...props }) => {
  return (
    <footer data-test-id={dataTestId} className={[styles.footer, className].join(' ')} {...props}>
      <span className={styles.footer__text}>
        © 2024, from
        <a className={styles.footer__link} href="https://binary-studio.com">
          binary studio
        </a>
        with
        <img className={styles.footer__icon} src={heart} alt="heart" />
      </span>
    </footer>
  );
};

export { Footer };
