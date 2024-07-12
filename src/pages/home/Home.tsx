import { type FC, useState } from 'react';
import { TripsFilter } from '@/components/tripsFilter/tripsFilter';
import { Tripcard } from '@/components/tripCard/tripCard'
import { type Trip } from '@/@types/';

import styles from './styles/home.module.css'
import trips from '@/assets/data/trips.json';

const Home: FC = () => {
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>(trips);

  const handleFilterChange = (filters: { search: string; duration: string; level: string }) => {
    const { search, duration, level } = filters;

    const filtered = trips.filter((trip) => {
      const matchesSearch = trip.title.toLowerCase().includes(search.toLowerCase());
      const matchesLevel = !level || trip.level === level;

      let matchesDuration = true;

      if (duration) {
        const [min, max] = duration.split('_x_').map(Number);

        if (max) {
          matchesDuration = trip.duration >= min && trip.duration < max;
        } else {
          matchesDuration = trip.duration >= min;
        }
      }

      return matchesSearch && matchesLevel && matchesDuration;
    });

    setFilteredTrips(filtered);
  };

  return (
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
