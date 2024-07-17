import { type FC, useState, useEffect } from 'react';
import { TripsFilter } from '@/components/tripsFilter/tripsFilter';
import { Tripcard } from '@/components/tripCard/tripCard'
import { type Trip } from '@/@types/';

import styles from './styles/home.module.css'
import { useAppSelector } from '@/hooks/useAppSelector';
import { DataStatus } from '@/constants/redux';
import { Loader } from '@/components/loader/loader';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { tripsActions } from '@/libs/redux/slices/trips';

const Home: FC = () => {
  const { dataStatus, trips } = useAppSelector(({ trips }) => trips);
  const [ filteredTrips, setFilteredTrips ] = useState<Trip[]>([]);
  const isLoading = dataStatus === DataStatus.PENDING;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tripsActions.getAllTrips());
  }, [dispatch]);

  useEffect(() => {
    if (trips) {
      setFilteredTrips(trips);
    }
  }, [trips]);

  const handleFilterChange = (filters: { search: string; duration: string; level: string }) => {
    const { search, duration, level } = filters;

    if (trips) {
      const filtered = trips.filter((trip) => {
        const regex = new RegExp(search, 'i');
        const matchesSearch = trip.title.search(regex) !== -1;
        const matchesLevel = !level || trip.level === level;

        let matchesDuration = true;

        if (duration) {
          const [min, max] = duration.split('_x_').map(Number);

          if (max) {
            matchesDuration = trip.duration > min && trip.duration <= max;
          } else {
            matchesDuration = trip.duration > min;
          }
        }
        return matchesSearch && matchesLevel && matchesDuration;
      });
      setFilteredTrips(filtered)
    }
  };

  return isLoading ?
    <Loader />
    : (
    <main>
      <h1 className="visually-hidden">Travel App</h1>
      <TripsFilter onFilterChange={handleFilterChange} />
      <section className={styles["trips"]}>
        <h2 className="visually-hidden">Trips List</h2>
        <ul className={styles["trip-list"]}>
          {filteredTrips.map(trip => <Tripcard {...trip} key={trip.id} />)}
        </ul>
      </section>
    </main>
  );
};

export { Home };
