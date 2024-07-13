import { type FC } from "react";
import { Booking } from "@/components/booking/booking";
import { type Booking as TBooking } from "@/@types";

import styles from './styles/bookings.module.css'

interface BookingsProps {
  setBookings: React.Dispatch<React.SetStateAction<TBooking[]>>;
  bookings: TBooking[];
}

const Bookings:FC<BookingsProps> = ({ setBookings, bookings }) => {
  const sortedBookings = bookings.sort((a, b) => {
    return new Date(a.date).valueOf() - new Date(b.date).valueOf()
  })
  return (
    <main className={styles["bookings-page"]}>
      <h1 className="visually-hidden">Travel App</h1>
      <ul className={styles["bookings__list"]}>
        {sortedBookings.length > 0 ?
          sortedBookings.map(booking => <Booking key={booking.id} booking={booking} setBookings={setBookings} />)
          : 
          <h1>No bookings yet</h1>
        }
      </ul>
    </main>
  )
}

export { Bookings };
