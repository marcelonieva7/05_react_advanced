import { useEffect, type FC } from "react";
import { Booking } from "@/components/booking/booking";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { bookingsActions } from "@/libs/redux/slices/bookings";
import { Loader } from "@/components/loader/loader";

import styles from './styles/bookings.module.css'

const Bookings:FC = () => {
  const { bookings, isGettingBookings} = useAppSelector(({ bookings }) => bookings)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(bookingsActions.getAllBookings());
  }, [dispatch]);

  const sortedBookings = [...bookings].sort((a, b) => {
    return new Date(a.date).valueOf() - new Date(b.date).valueOf()
  })
  return isGettingBookings ?
    <Loader />
    : (
    <main className={styles["bookings-page"]}>
      <h1 className="visually-hidden">Travel App</h1>
      <ul className={styles["bookings__list"]}>
        {sortedBookings.length > 0 ?
          sortedBookings.map(booking => <Booking key={booking.id} booking={booking}/>)
          : 
          <h1 className={styles["bookings__empty"]}>No bookings yet</h1>
        }
      </ul>
    </main>
  )
}

export { Bookings };
