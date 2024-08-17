export default function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}
