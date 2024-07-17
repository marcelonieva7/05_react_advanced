import { type FC } from "react";
import { type Booking } from "@/@types";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { bookingsActions } from "@/libs/redux/slices/bookings";
import { DataStatus } from "@/constants/redux";
import { notification } from "@/libs/notification/notificationService";
import { useAppSelector } from "@/hooks/useAppSelector";

import styles from './styles/booking.module.css'

interface BookingProps {
  booking: Booking;
}

const Booking: FC<BookingProps> = ({ booking }) => {
  const { guests, trip, date, totalPrice, id } = booking
  const dispatch = useAppDispatch();
  const { dataStatus } = useAppSelector(({ bookings }) => bookings)
  const isLoading = dataStatus === DataStatus.PENDING;

  const handleCancelBooking = (): void => {
    dispatch(bookingsActions.deleteBooking({ bookingId: id })).then( action => {
      if (action.meta.requestStatus === DataStatus.FULFILLED) {
        notification.success("Booking deleted successfully");
      }
    })
  }
  return (
    <li data-test-id="booking" className={`${styles["booking"]} ${isLoading ? styles["booking--deleting"] : ''}`}>
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
        onClick={handleCancelBooking}
        title="Cancel booking"
        disabled={isLoading}
      >
        <span className="visually-hidden">Cancel booking</span>
          {isLoading ? <div className={styles.loader}/> : "×"}
      </button>
    </li>
  )
}

export { Booking };
