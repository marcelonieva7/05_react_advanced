import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '@/libs/router/appRoutes';

import styles from './styles/tripCard.module.css'
import stylesBtn from '@/components/button/styles/button.module.css'


interface TripcardProps {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: number;
  price: number;
  image: string;
  createdAt: string;
}

const Tripcard: FC<TripcardProps> = ({ image, title, level, duration, price, id }) => {
  return (
    <li data-test-id="trip-card" className={styles["trip-card"]}>
      <img
        data-test-id="trip-card-image"
        src={image}
        alt="trip photo"
      />
      <div className={styles["trip-card__content"]}>
        <div className={styles["trip-info"]}>
          <h3 data-test-id="trip-card-title" className={styles["trip-info__title"]}>
            {title}
          </h3>
          <div className={styles["trip-info__content"]}>
            <span
              data-test-id="trip-card-duration"
              className={styles["trip-info__duration"]}
            >
              <strong>{duration}</strong> days
            </span>
            <span data-test-id="trip-card-level" className={styles["trip-info__level"]}>
              {level}
            </span>
          </div>
        </div>
        <div className={styles["trip-price"]}>
          <span>Price</span>
          <strong
            data-test-id="trip-card-price-value"
            className={styles["trip-price__value"]}
          >
            ${price}
          </strong>
        </div>
      </div>
      <Link
        data-test-id="trip-card-link"
        to={`${AppRoutes.TRIP}/${id}`}
        className={stylesBtn["button"]}
      >
        Discover a trip
      </Link>
    </li>
  )
}

export { Tripcard };
