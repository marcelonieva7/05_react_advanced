import { type FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TripInfo } from '@/components/tripInfo/tripInfo';
import { BookTripModal } from "@/components/bookTripModal/bookTripModal";
import { AppRoutes } from "@/libs/router/appRoutes";

import styles from './styles/trip.module.css'
import trips from '@/assets/data/trips.json';

const TripNotFound = () => (
  <>
    <h2>Trip not found</h2>
    <h3>Redirecting to the main page</h3>
  </>
)

const Trip:FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const trip = trips.find(trip => trip.id === id);

  useEffect(() => {
    if (!trip) {
      setTimeout(() => navigate(AppRoutes.HOME), 5000)
    }
  }, [navigate, trip]);
  
  return (
    <main className={styles["trip-page"]}>
      <h1 className="visually-hidden">Travel App</h1>
      {trip ? (
        <>
          <TripInfo {...trip} setIsOpen={setIsOpen} />
          <BookTripModal isOpen={isOpen} setIsOpen={setIsOpen} trip={trip} />
        </>
      ) : <TripNotFound />}
    </main>
  )
}

export { Trip };
