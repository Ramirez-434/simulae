import { describe, it, expect } from 'vitest';
import { generateCNPJ } from '../utils/generators/cnpj';

function isValidCNPJ(cnpjStr) {
  const cnpj = cnpjStr.replace(/\D/g, '');
  if (cnpj.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  let length = cnpj.length - 2;
  let numbers = cnpj.substring(0, length);
  const digits = cnpj.substring(length);
  let sum = 0;
  let pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  if (result !== parseInt(digits.charAt(0))) return false;

  length = length + 1;
  numbers = cnpj.substring(0, length);
  sum = 0;
  pos = length - 7;
  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - sum % 11;
  if (result !== parseInt(digits.charAt(1))) return false;

  return true;
}

describe('Gerador de CNPJ (Módulo 11)', () => {
  it('deve gerar um CNPJ no formato xx.xxx.xxx/xxxx-xx', () => {
    const cnpj = generateCNPJ();
    expect(cnpj).toMatch(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/);
  });

  it('deve gerar CNPJs matematicamente válidos (Módulo 11)', () => {
    for (let i = 0; i < 100; i++) {
      const cnpj = generateCNPJ();
      expect(isValidCNPJ(cnpj)).toBe(true);
    }
  });
});
