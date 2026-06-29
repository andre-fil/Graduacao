import { useMemo } from 'react';
import { getAllAdvantages, getAllModalities } from '../services';

export function useAdvantages() {
  const advantages = useMemo(() => getAllAdvantages(), []);
  return { advantages };
}

export function useModalities() {
  const modalities = useMemo(() => getAllModalities(), []);
  return { modalities };
}
