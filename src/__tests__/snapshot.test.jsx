import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import CardGeneratorWhatsApp from '../components/CardGeneratorWhatsApp';
import { HistoryProvider } from '../context/HistoryContext';

test('DOM Snapshot of CardGeneratorWhatsApp (Phase 1)', () => {
  const fakeGenerator = () => "Você: Olá!\n[10:01] Olá, tudo bem?";
  
  const { container } = render(
    <HistoryProvider>
      <CardGeneratorWhatsApp title="WhatsApp" description="Teste" generatorFn={fakeGenerator} />
    </HistoryProvider>
  );

  console.log("=== DOM SNAPSHOT START ===");
  // Imprime o HTML formatado da interface para análise estática
  console.log(container.innerHTML);
  console.log("=== DOM SNAPSHOT END ===");
  
  expect(true).toBe(true);
});
