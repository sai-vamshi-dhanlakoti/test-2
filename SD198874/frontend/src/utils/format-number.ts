export function formatNumber(value: number, precision = 0) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: precision,
  }).format(value);
}
