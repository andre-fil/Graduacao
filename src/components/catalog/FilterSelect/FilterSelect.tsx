import type { SelectHTMLAttributes } from 'react';
import styles from './FilterSelect.module.css';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: FilterOption[];
  placeholder?: string;
}

export function FilterSelect({
  label,
  options,
  placeholder = 'Todos',
  id,
  ...rest
}: FilterSelectProps) {
  const selectId = id ?? label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={styles.field}>
      <label htmlFor={selectId} className={styles.label}>
        {label}
      </label>
      <select id={selectId} className={styles.select} {...rest}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
