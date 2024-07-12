import { type FC, type LabelHTMLAttributes, type InputHTMLAttributes } from 'react';

import styles from './styles/input.module.css';

interface InputProps extends LabelHTMLAttributes<HTMLLabelElement> {
  title: string;
  input: InputHTMLAttributes<HTMLInputElement> & {'data-test-id': string};
  isHiddenTitle: boolean    
}

const Input:FC<InputProps> = ({ className, title, isHiddenTitle, input, ...props}) => {
  return (
    <label className={[className, styles.input].join(' ')} {...props}>
      <span className={[isHiddenTitle && "visually-hidden", styles['input__heading']].join(' ')}>{title}</span>
      <input
        {...input}
      />
    </label>
  )
}

export { Input };
