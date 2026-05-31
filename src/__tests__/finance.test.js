import { describe, it, expect } from 'vitest';
import { generateCreditCard } from '../utils/generators/finance';

// Helper Luhn Algorithm validator
function isValidLuhn(cardNumber) {
  const digits = cardNumber.replace(/\D/g, '').split('').map(Number);
  let sum = 0;
  let isEven = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i];
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
}

describe('Gerador de Cartão de Crédito (Algoritmo de Luhn)', () => {
  it('deve gerar um número de cartão de crédito matematicamente válido', () => {
    for (let i = 0; i < 100; i++) {
      // By default it might generate formatted string (e.g. 1234 5678 ...), we validate its digits
      const cc = generateCreditCard('visa');
      expect(isValidLuhn(cc)).toBe(true);
    }
  });

  it('deve iniciar com os prefixos corretos por bandeira', () => {
    const visa = generateCreditCard('visa');
    expect(visa.startsWith('4')).toBe(true);

    const mastercard = generateCreditCard('mastercard');
    expect(mastercard.startsWith('5')).toBe(true);
    
    const amex = generateCreditCard('amex');
    expect(amex.startsWith('34') || amex.startsWith('37')).toBe(true);
  });
});
