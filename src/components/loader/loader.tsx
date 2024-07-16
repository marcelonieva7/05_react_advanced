import { type FC } from "react";

import styles from './styles/loader.module.css'

const Loader: FC = () => {
  return (
    <div data-test-id="loader" className={styles.loader}></div>
  )
} 

export { Loader };
