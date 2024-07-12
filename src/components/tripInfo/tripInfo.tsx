import { type FC } from "react";
import { type Trip } from "@/@types";

import styles from './styles/tripInfo.module.css'
import stylesTripCard from '@/components/tripCard/styles/tripCard.module.css'
import stylesBtn from '@/components/button/styles/button.module.css'

type TripInfoProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
} & Trip;

const TripInfo:FC<TripInfoProps> = ({ title, image, description, duration, level, price, setIsOpen }) => {
  return (
    <div className={styles["trip"]}>
      <img
        data-test-id="trip-details-image"
        src={image}
        className={styles["trip__img"]}
        alt="trip photo"
      />
      <div className={styles["trip__content"]}>
        <div className={stylesTripCard["trip-info"]}>
          <h3 data-test-id="trip-details-title" className={stylesTripCard["trip-info__title"]}>
            {title}
          </h3>
          <div className={stylesTripCard["trip-info__content"]}>
            <span
              data-test-id="trip-details-duration"
              className={stylesTripCard["trip-info__duration"]}
            >
              <strong>{duration}</strong> days
            </span>
            <span data-test-id="trip-details-level" className={stylesTripCard["trip-info__level"]}>
              {level}
            </span>
          </div>
        </div>
        <div
          data-test-id="trip-details-description"
          className={styles["trip__description"]}
        >
          {description}
        </div>
        <div className={stylesTripCard["trip-price"]}>
          <span>Price</span>
          <strong
            data-test-id="trip-details-price-value"
            className={stylesTripCard["trip-price__value"]}
          >
            {`$${price}`}
          </strong>
        </div>
        <button
          data-test-id="trip-details-button"
          className={[styles["trip__button"], stylesBtn.button].join(' ')}
          onClick={() => setIsOpen(true)}
        >
          Book a trip
        </button>
      </div>
    </div>
  )
}

export { TripInfo };