const getRandomChar = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));
const getRandomDigit = () => Math.floor(Math.random() * 10);

export function generateLicensePlate(mercosul = true) {
  const c1 = getRandomChar();
  const c2 = getRandomChar();
  const c3 = getRandomChar();
  const d1 = getRandomDigit();
  
  if (mercosul) {
    const c4 = getRandomChar();
    const d2 = getRandomDigit();
    const d3 = getRandomDigit();
    return `${c1}${c2}${c3}${d1}${c4}${d2}${d3}`; // AAA1A11
  } else {
    const d2 = getRandomDigit();
    const d3 = getRandomDigit();
    const d4 = getRandomDigit();
    return `${c1}${c2}${c3}-${d1}${d2}${d3}${d4}`; // AAA-1111
  }
}

export function generateMotoPlate(mercosul = true) {
  // Motos usam o mesmo padrão, a função é apenas um alias semântico
  return generateLicensePlate(mercosul);
}

export function generateRENAVAM() {
  const n = Array.from({ length: 11 }, getRandomDigit);
  // simplified generation (random 11 digits, but technically requires modulus 11 in real life)
  // implementing module 11 for RENAVAM:
  // Base is first 10 digits
  const base = Array.from({ length: 10 }, getRandomDigit);
  const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const sum = base.reduce((acc, val, i) => acc + val * weights[i], 0);
  let mod = sum % 11;
  let d1 = mod < 2 ? 0 : 11 - mod;
  if (d1 >= 10) d1 = 0;
  
  return `${base.join('')}${d1}`;
}

export function generateVIN() {
  const chars = '0123456789ABCDEFGHJKLMNPRSTUVWXYZ'; // Excludes I, O, Q
  const vinLength = 17;
  let vin = '';
  for (let i = 0; i < vinLength; i++) {
    vin += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return vin;
}
