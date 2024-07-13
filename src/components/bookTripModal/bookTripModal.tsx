import { useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../input/input';
import { AppRoutes } from '@/libs/router/appRoutes';
import { type Booking, type Trip } from '@/@types';

import styles from './styles/bookTripModal.module.css';
import stylesTrip from '@/components/tripCard/styles/tripCard.module.css';
import stylesBtn from '@/components/button/styles/button.module.css'

interface BookTripModalProps {
  isOpen: boolean;
  trip: Trip;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
}

const generateMockId = (): string => {
  const randomString = Math.random().toString(36);
  return `${Date.now()}_${randomString.substring(2, 11)}`;
};

const USER_ID = "1dd97a12-848f-4a1d-8a7d-34a2132fca94";

const BookTripModal:FC<BookTripModalProps> = ({ isOpen, setIsOpen, trip, setBookings }) => {
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(trip.price);
  const navigate = useNavigate();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];
  const { title, duration, level, price } = trip;

  const handleClose = (): void => {
    setIsOpen(false)
  }

  const handleGuestsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newGuests = Number(e.target.value)
    setGuests(newGuests)
    setTotalPrice(price * newGuests)
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newDate = e.target.value
    setDate(newDate)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const id = generateMockId()
    const newBooking: Booking = {
      id,
      userId: USER_ID,
      tripId: trip.id,
      guests,
      totalPrice,
      createdAt: new Date().toISOString(),
      date: new Date(date).toISOString(),
      trip: {
        duration,
        price,
        title
      }
    }

    setBookings(prev => [...prev, newBooking])
    navigate(AppRoutes.BOOKINGS)
  }
  
  return (
    <div hidden={!isOpen} >
      <div className={styles["modal"]}>
        <div data-test-id="book-trip-popup" className={styles["book-trip-popup"]}>
          <button
            data-test-id="book-trip-popup-close"
            className={styles["book-trip-popup__close"]}
            onClick={handleClose}
          >
            ×
          </button>
          <form className={styles["book-trip-popup__form"]} autoComplete="off" onSubmit={handleSubmit}>
            <div className={stylesTrip["trip-info"]}>
              <h3 data-test-id="book-trip-popup-title" className={stylesTrip["trip-info__title"]}>
                {title}
              </h3>
              <div className={stylesTrip["trip-info__content"]}>
                <span
                  data-test-id="book-trip-popup-duration"
                  className={stylesTrip["trip-info__duration"]}
                >
                  <strong>{duration}</strong> days
                </span>
                <span
                  data-test-id="book-trip-popup-level"
                  className={stylesTrip["trip-info__level"]}
                >
                  {level}
                </span>
              </div>
            </div>
            <Input
              title="Date"
              isHiddenTitle={false}
              input={{
                "data-test-id": "book-trip-popup-date",
                name: "date",
                type: "date",
                min: minDate,
                required: true,
                value: date,
                onChange: handleDateChange
              }}
            />
            <Input
              title="Number of guests"
              isHiddenTitle={false}
              input={{
                "data-test-id": "book-trip-popup-guests",
                name: "guests",
                type: "number",
                required: true,
                min: "1",
                max: "10",
                value: guests,
                onChange: handleGuestsChange
              }}
            />
            <span className={styles["book-trip-popup__total"]}>
              Total:
              <output
                data-test-id="book-trip-popup-total-value"
                className={styles["book-trip-popup__total-value"]}
              >
                {`$${totalPrice}`}
              </output>
            </span>
            <button
              data-test-id="book-trip-popup-submit"
              className={stylesBtn["button"]}
              type="submit"
            >
              Book a trip
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export { BookTripModal };
