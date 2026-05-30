export function generatePIS(format = true) {
  const randomDigit = () => Math.floor(Math.random() * 10);
  const n = Array.from({ length: 10 }, randomDigit);
  
  const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = n.reduce((acc, val, i) => acc + val * weights[i], 0);
  
  let mod = sum % 11;
  let d1 = mod < 2 ? 0 : 11 - mod;
  
  const pis = `${n.join('')}${d1}`;
  
  if (format) {
    return pis.replace(/(\d{3})(\d{5})(\d{2})(\d{1})/, '$1.$2.$3-$4');
  }
  return pis;
}
