export function calculateDiscountPercent(original: number, promotional: number): number {
  if (original <= 0 || promotional >= original) return 0;
  return Math.round(((original - promotional) / original) * 100);
}
