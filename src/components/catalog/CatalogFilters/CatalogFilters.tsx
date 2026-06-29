import { useMemo } from 'react';
import type { CourseFilters } from '../../../types';
import {
  getAllAreas,
  getAllModalities,
  getAllPriceRanges,
  getAreaById,
  getModalityById,
  getPriceRangeById,
} from '../../../services';
import { FilterSelect } from '../FilterSelect';
import styles from './CatalogFilters.module.css';

interface CatalogFiltersProps {
  filters: CourseFilters;
  onFilterChange: (partial: Partial<CourseFilters>) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

export function CatalogFilters({
  filters,
  onFilterChange,
  onClear,
  hasActiveFilters,
}: CatalogFiltersProps) {
  const modalities = useMemo(() => getAllModalities(), []);
  const areas = useMemo(() => getAllAreas(), []);
  const priceRanges = useMemo(() => getAllPriceRanges(), []);

  const activeLabels = useMemo(() => {
    const labels: string[] = [];

    if (filters.modalityId) {
      const modality = getModalityById(filters.modalityId);
      if (modality) labels.push(`Modalidade: ${modality.name}`);
    }

    if (filters.areaId) {
      const area = getAreaById(filters.areaId);
      if (area) labels.push(`Área: ${area.name}`);
    }

    if (filters.priceRangeId) {
      const range = getPriceRangeById(filters.priceRangeId);
      if (range) labels.push(`Preço: ${range.label}`);
    }

    return labels;
  }, [filters]);

  return (
    <aside className={styles.panel} aria-label="Filtros do catálogo">
      <div className={styles.header}>
        <h2 className={styles.title}>Filtros</h2>
        {hasActiveFilters && (
          <button type="button" className={styles.clearBtn} onClick={onClear}>
            Limpar
          </button>
        )}
      </div>

      <div className={styles.fields}>
        <FilterSelect
          label="Modalidade"
          value={filters.modalityId}
          onChange={(event) => onFilterChange({ modalityId: event.target.value })}
          options={modalities.map((item) => ({ value: item.id, label: item.name }))}
        />

        <FilterSelect
          label="Área"
          value={filters.areaId}
          onChange={(event) => onFilterChange({ areaId: event.target.value })}
          options={areas.map((item) => ({ value: item.id, label: item.name }))}
        />

        <FilterSelect
          label="Faixa de preço"
          value={filters.priceRangeId}
          onChange={(event) => onFilterChange({ priceRangeId: event.target.value })}
          options={priceRanges.map((item) => ({ value: item.id, label: item.label }))}
        />
      </div>

      {activeLabels.length > 0 && (
        <ul className={styles.activeList}>
          {activeLabels.map((label) => (
            <li key={label} className={styles.activeTag}>
              {label}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
