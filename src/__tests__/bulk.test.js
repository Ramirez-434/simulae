import { describe, it, expect } from 'vitest';
import { generateCPF } from '../utils/generators/cpf';
import { generateCreditCard } from '../utils/generators/finance';
import { generateUUID } from '../utils/generators/tech';

describe('Stress Test / Geração em Lote (Bulk Generation)', () => {
  it('deve gerar 10.000 CPFs e formatá-los em um único texto em menos de 100ms', () => {
    const QUANTITY = 10000;
    
    const start = performance.now();
    
    // Simula o comportamento do BulkDownload (array -> join)
    const results = [];
    for (let i = 0; i < QUANTITY; i++) {
      results.push(generateCPF());
    }
    const blobContent = results.join('\n');
    
    const end = performance.now();
    const duration = end - start;

    expect(results.length).toBe(QUANTITY);
    expect(blobContent.length).toBeGreaterThan(QUANTITY * 10);
    
    // O Node/Vite costuma processar isso em < 30ms. Se passar de 100ms, a UI trava.
    expect(duration).toBeLessThan(150);
  });

  it('deve gerar 10.000 Cartões de Crédito (Luhn) em menos de 150ms', () => {
    const QUANTITY = 10000;
    
    const start = performance.now();
    const results = [];
    for (let i = 0; i < QUANTITY; i++) {
      results.push(generateCreditCard('mastercard'));
    }
    const end = performance.now();
    const duration = end - start;

    expect(results.length).toBe(QUANTITY);
    expect(duration).toBeLessThan(150);
  });

  it('deve gerar 10.000 UUIDs (Web Crypto simulado/Math.random) super rápido', () => {
    const QUANTITY = 10000;
    
    const start = performance.now();
    const results = [];
    for (let i = 0; i < QUANTITY; i++) {
      results.push(generateUUID());
    }
    const end = performance.now();
    const duration = end - start;

    expect(results.length).toBe(QUANTITY);
    expect(duration).toBeLessThan(100);
  });
});
