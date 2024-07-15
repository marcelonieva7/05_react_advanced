import { type FC, type ButtonHTMLAttributes } from 'react';

import styles from './styles/button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  'data-test-id'?: string;
}
  
const Button: FC<ButtonProps> = ({ children, 'data-test-id': dataTestId, ...props }) => {
  const { className, ...btnProps } = props
  return (
    <button data-test-id={dataTestId} className={`${styles.button} ${className || ''}`} {...btnProps}>
      {children}
    </button>
  );
};
  
export { Button }
