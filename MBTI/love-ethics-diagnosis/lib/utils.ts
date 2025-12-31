export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const total = numbers.reduce((sum, num) => sum + num, 0);
  return total / numbers.length;
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}
