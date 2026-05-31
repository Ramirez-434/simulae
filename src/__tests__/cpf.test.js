import { describe, it, expect } from 'vitest';
import { generateCPF } from '../utils/generators/cpf';

// Helper de validação do Módulo 11 para o CPF
function isValidCPF(cpfStr) {
  const cpf = cpfStr.replace(/\D/g, '');
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  let remainder;
  
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i-1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if ((remainder === 10) || (remainder === 11)) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i-1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if ((remainder === 10) || (remainder === 11)) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

describe('Gerador de CPF (Módulo 11)', () => {
  it('deve gerar um CPF no formato xxx.xxx.xxx-xx', () => {
    const cpf = generateCPF();
    expect(cpf).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
  });

  it('deve gerar CPFs matematicamente válidos (Módulo 11)', () => {
    for (let i = 0; i < 100; i++) {
      const cpf = generateCPF();
      expect(isValidCPF(cpf)).toBe(true);
    }
  });

  it('o helper de validação deve rejeitar padrões repetidos (ex: 111.111.111-11)', () => {
    expect(isValidCPF('111.111.111-11')).toBe(false);
    expect(isValidCPF('000.000.000-00')).toBe(false);
  });
});
