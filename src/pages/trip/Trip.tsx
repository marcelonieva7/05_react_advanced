import { type FC, useEffect, useState } from "react";
import { type Booking } from "@/@types";
import { useNavigate, useParams } from "react-router-dom";
import { TripInfo } from '@/components/tripInfo/tripInfo';
import { BookTripModal } from "@/components/bookTripModal/bookTripModal";
import { AppRoutes } from "@/libs/router/appRoutes";

import styles from './styles/trip.module.css'
import trips from '@/assets/data/trips.json';

interface TripProps {
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>
}

const TripNotFound: FC<{ count: number}> = ({ count }) => (
  <>
    <h2>Trip not found</h2>
    <h3>Redirecting to the main page in {count} seconds</h3>
  </>
)

const Trip:FC<TripProps> = ({ setBookings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const { tripId } = useParams();
  const trip = trips.find(trip => trip.id === tripId);

  useEffect(() => {
    if (!trip) {
      const timeout = setTimeout(() => navigate(AppRoutes.HOME), 5000)      
      const interval = setInterval(() => setCount(prev => prev - 1), 1000)

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }
  }, [navigate, trip]);
  
  return (
    <main className={styles["trip-page"]}>
      <h1 className="visually-hidden">Travel App</h1>
      {trip ? (
        <>
          <TripInfo {...trip} setIsOpen={setIsOpen} />
          <BookTripModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            trip={trip}
            setBookings={setBookings}
          />
        </>
        ) :
        <TripNotFound count={count} />
      }
    </main>
  )
}

export { Trip };
