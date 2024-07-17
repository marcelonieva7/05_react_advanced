import { useState, type FC } from 'react';
import { type Trip } from '@/@types';
import { type BookingAddRequestDto } from '@/@types/api'
import { Input } from '@/components/input/input';
import { notification } from '@/libs/notification/notificationService'
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { bookingsActions } from '@/libs/redux/slices/bookings';
import { DataStatus } from '@/constants/redux';

import styles from './styles/bookTripModal.module.css';
import stylesTrip from '@/components/tripCard/styles/tripCard.module.css';
import stylesBtn from '@/components/button/styles/button.module.css'
import { useAppSelector } from '@/hooks/useAppSelector';

interface BookTripModalProps {
  isOpen: boolean;
  trip: Trip;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const BookTripModal:FC<BookTripModalProps> = ({ isOpen, setIsOpen, trip }) => {
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(trip.price);

  const dispatch = useAppDispatch();
  const { dataStatus } = useAppSelector(({ bookings }) => bookings)
  const isLoading = dataStatus === DataStatus.PENDING;

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget);
    const parsedFormData = Object.fromEntries(formData.entries()) as { guests: string; date: string}

    const payload: BookingAddRequestDto = {
      date: parsedFormData.date,
      guests: Number(parsedFormData.guests),
      tripId: trip.id
    }

    dispatch(bookingsActions.addBooking(payload)).then((action => {
      if (action.meta.requestStatus === DataStatus.FULFILLED) {
        notification.success('Trip booked successfully')
        setIsOpen(false)
      }
    }))
  }
  
  return (
    <div >
      <div hidden={!isOpen} className={`${styles.modal} ${isOpen ? styles["modal-hidden"] : ''}`}>
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
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Book a trip'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export { BookTripModal };
