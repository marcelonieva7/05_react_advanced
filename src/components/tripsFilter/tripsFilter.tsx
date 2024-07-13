import { type FC, type FormEvent, useState, ChangeEvent } from 'react';
import { Input } from '@/components/input/input'

import styles from './styles/tripsfilter.module.css';

interface TripsFilterProps {
  onFilterChange: (filters: Filters) => void;
}

interface Filters {
  search: string;
  duration: string;
  level: string;
}

const TripsFilter: FC<TripsFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    duration: '',
    level: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;    
    const newFilters = { ...filters, [name]: value };
    onFilterChange(newFilters);
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  return (
    <section className={styles["trips-filter"]}>
      <h2 className="visually-hidden">Trips filter</h2>
      <form className={styles['trips-filter__form']} onSubmit={handleSubmit} autoComplete="off">
        <Input
          className={styles['trips-filter__search']}
          isHiddenTitle
          title='Search by name'
          input={{
            "data-test-id": "filter-search",
            name: "search",
            type: "search",
            placeholder: "search by title",
            value: filters.search,
            onChange: handleInputChange
          }}
        />        
        <label className={styles.select}>
          <span className="visually-hidden">Search by duration</span>
          <select
            data-test-id="filter-duration"
            name="duration"
            value={filters.duration}
            onChange={handleInputChange}
          >
            <option value="">duration</option>
            <option value="0_x_5">&lt; 5 days</option>
            <option value="5_x_10">&lt; 10 days</option>
            <option value="10">&ge; 10 days</option>
          </select>
        </label>
        <label className={styles.select}>
          <span className="visually-hidden">Search by level</span>
          <select
            data-test-id="filter-level"
            name="level"
            value={filters.level}
            onChange={handleInputChange}
          >
            <option value="">level</option>
            <option value="easy">easy</option>
            <option value="moderate">moderate</option>
            <option value="difficult">difficult</option>
          </select>
        </label>
      </form>
    </section>
  );
};

export { TripsFilter };
