export interface PriceRange {
  id: string;
  label: string;
  min: number;
  max: number | null;
}

export interface CourseFilters {
  query: string;
  modalityId: string;
  areaId: string;
  priceRangeId: string;
}
