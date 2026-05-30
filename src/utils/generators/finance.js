// Lógicas Matemáticas de Base

export function calculateLuhn(numberString) {
  let sum = 0;
  let alternate = false;
  for (let i = numberString.length - 1; i >= 0; i--) {
    let n = parseInt(numberString[i], 10);
    if (alternate) {
      n *= 2;
      if (n > 9) {
        n = (n % 10) + 1;
      }
    }
    sum += n;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}

export function generateLuhnDigit(baseString) {
  let sum = 0;
  let alternate = true;
  for (let i = baseString.length - 1; i >= 0; i--) {
    let n = parseInt(baseString[i], 10);
    if (alternate) {
      n *= 2;
      if (n > 9) {
        n = (n % 10) + 1;
      }
    }
    sum += n;
    alternate = !alternate;
  }
  const mod = sum % 10;
  return mod === 0 ? 0 : 10 - mod;
}

export function generateCreditCard(brand = 'visa', format = true) {
  let prefix = '';
  if (brand === 'visa') prefix = '4';
  else if (brand === 'mastercard') prefix = '5' + (Math.floor(Math.random() * 5) + 1);
  else if (brand === 'amex') prefix = '3' + (Math.random() < 0.5 ? '4' : '7');
  
  const length = brand === 'amex' ? 15 : 16;
  const baseLength = length - prefix.length - 1;
  let base = prefix;
  
  for (let i = 0; i < baseLength; i++) {
    base += Math.floor(Math.random() * 10);
  }
  
  const checkDigit = generateLuhnDigit(base);
  const card = base + checkDigit;
  
  if (format) {
    if (brand === 'amex') return card.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
    return card.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');
  }
  return card;
}

function mod97(stringNum) {
  let checksum = stringNum.slice(0, 2);
  let fragment;
  for (let offset = 2; offset < stringNum.length; offset += 7) {
    fragment = String(checksum) + stringNum.substring(offset, offset + 7);
    checksum = parseInt(fragment, 10) % 97;
  }
  return checksum;
}

export function generateIBAN() {
  const countryCode = 'BR';
  const bban = Array.from({ length: 25 }, () => Math.floor(Math.random() * 10)).join('');
  const countryNum = '112700';
  const tempIban = bban + countryNum;
  const remainder = mod97(tempIban);
  const checkDigits = ('0' + (98 - remainder)).slice(-2);
  return `${countryCode}${checkDigits}${bban}`;
}

export function generateBancaryAccount() {
  const agency = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');
  const accountBase = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join('');
  const weights = [6, 5, 4, 3, 2];
  let sum = 0;
  for(let i=0; i<accountBase.length; i++) {
    sum += parseInt(accountBase[i]) * weights[i];
  }
  let mod = sum % 11;
  let digit = mod < 2 ? 0 : 11 - mod;
  return `Ag: ${agency} / Cc: ${accountBase}-${digit}`;
}

export function generateBoleto() {
  const field1 = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('');
  const d1 = generateLuhnDigit(field1);
  const f1 = `${field1}${d1}`;

  const field2 = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
  const d2 = generateLuhnDigit(field2);
  const f2 = `${field2}${d2}`;

  const field3 = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
  const d3 = generateLuhnDigit(field3);
  const f3 = `${field3}${d3}`;

  const dvGeral = Math.floor(Math.random() * 9) + 1; // Fictitious Mod 11 DV
  const fatorVencimento = Math.floor(Math.random() * 9000) + 1000;
  const valor = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');

  return `${f1.slice(0,5)}.${f1.slice(5)} ${f2.slice(0,5)}.${f2.slice(5)} ${f3.slice(0,5)}.${f3.slice(5)} ${dvGeral} ${fatorVencimento}${valor}`;
}

function crc16(payload) {
  let crc = 0xFFFF;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) > 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
    }
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

export function generatePIX() {
  const pixKey = 'teste@geradorbrasil.com';
  const payloadStr = `00020126440014BR.GOV.BCB.PIX0122${pixKey}520400005303986540510.005802BR5915Gerador Brasil6009Sao Paulo62070503***6304`;
  const crc = crc16(payloadStr);
  return `${payloadStr}${crc}`;
}
