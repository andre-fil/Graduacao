import { type FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../app/routes';
import { SearchIcon } from '../../ui/icons';
import styles from './CourseSearch.module.css';

interface CourseSearchProps {
  placeholder?: string;
  className?: string;
  size?: 'default' | 'large';
  defaultQuery?: string;
  onSearch?: (query: string) => void;
}

export function CourseSearch({
  placeholder = 'Buscar curso por nome ou área...',
  className,
  size = 'default',
  defaultQuery = '',
  onSearch,
}: CourseSearchProps) {
  const [query, setQuery] = useState(defaultQuery);
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(defaultQuery);
  }, [defaultQuery]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (onSearch) {
      onSearch(query);
      return;
    }

    navigate(ROUTES.coursesWithQuery({ q: query }));
  }

  return (
    <form
      className={[styles.form, styles[size], className].filter(Boolean).join(' ')}
      onSubmit={handleSubmit}
      role="search"
    >
      <label htmlFor="course-search" className={styles.label}>
        Buscar cursos
      </label>
      <div className={styles.inputWrapper}>
        <SearchIcon className={styles.icon} />
        <input
          id="course-search"
          type="search"
          className={styles.input}
          placeholder={placeholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit" className={styles.submit}>
          Buscar
        </button>
      </div>
    </form>
  );
}
