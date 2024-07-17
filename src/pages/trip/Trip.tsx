import { type FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TripInfo } from '@/components/tripInfo/tripInfo';
import { BookTripModal } from "@/components/bookTripModal/bookTripModal";
import { AppRoutes } from "@/libs/router/appRoutes";

import styles from './styles/trip.module.css'
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { tripsActions } from "@/libs/redux/slices/trips";
import { DataStatus } from "@/constants/redux";
import { Loader } from "@/components/loader/loader";

const TripNotFound: FC = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => navigate(AppRoutes.HOME), 5000)      
    const interval = setInterval(() => setCount(prev => prev - 1), 1000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [navigate]);

  return (
    <>
      <h2>Trip not found</h2>
      <h3>Redirecting to the main page in {count} seconds</h3>
    </>
  )
}

const Trip: FC = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  const { tripId } = useParams();
  const dispatch = useAppDispatch();
  const { trip, dataStatus } = useAppSelector(({ trips }) => trips);
  const isLoading = dataStatus === DataStatus.PENDING;

  useEffect(() => {
    if (tripId) {
      dispatch(tripsActions.getTripById({ tripId }));
    }
  }, [dispatch, tripId]);
  
  return isLoading ?
    <Loader />
    : (
    <main className={styles["trip-page"]}>
      <h1 className="visually-hidden">Travel App</h1>
      {trip ? (
        <>
          <TripInfo {...trip} setIsOpen={setIsOpen} />
          <BookTripModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            trip={trip}
          />
        </>
        ) :
        <TripNotFound/>
      }
    </main>
  )
}

export { Trip };
