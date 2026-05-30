export function generateCNH() {
  const randomDigit = () => Math.floor(Math.random() * 10);
  const n = Array.from({ length: 11 }, randomDigit);
  return n.join('');
}
