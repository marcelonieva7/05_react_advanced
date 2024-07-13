import { type FC } from "react";
import { type Booking } from "@/@types";

import styles from './styles/booking.module.css'

interface BookingProps {
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  booking: Booking;
}

const Booking: FC<BookingProps> = ({ setBookings, booking }) => {
  const { guests, trip, date, totalPrice, id } = booking
  const handleCancel = (): void => {
    setBookings(prev => prev.filter(booking => booking.id !== id))
  }
  return (
    <li data-test-id="booking" className={styles["booking"]}>
      <h3 data-test-id="booking-title" className={styles["booking__title"]}>{trip.title}</h3>
      <span data-test-id="booking-guests" className={styles["booking__guests"]}>
        {`${guests} guests`}
      </span>
      <span data-test-id="booking-date" className={styles["booking__date"]}>
        {date.split('T')[0]}
      </span>
      <span data-test-id="booking-total" className={styles["booking__total"]}>
        {`$${totalPrice}`}
      </span>
      <button
        data-test-id="booking-cancel"
        className={styles["booking__cancel"]}
        onClick={handleCancel}
        title="Cancel booking"
      >
        <span className="visually-hidden">Cancel booking</span>
        ×
      </button>
    </li>
  )
}

export { Booking };
