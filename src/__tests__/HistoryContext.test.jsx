import { render, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { HistoryProvider, useHistory } from '../context/HistoryContext';

// Um componente falso apenas para acionar o nosso Hook de Histórico
const TestComponent = () => {
  const { addHistoryItem, history } = useHistory();
  
  return (
    <div>
      <button onClick={() => addHistoryItem('CPF', '123.456.789-00')}>
        Gerar
      </button>
      <span data-testid="tamanho">{history.length}</span>
    </div>
  );
};

describe('HistoryContext - Regras de Armazenamento', () => {
  beforeEach(() => {
    window.localStorage.clear(); // Limpa o mock antes de cada teste
    vi.clearAllMocks(); // Limpa o histórico de chamadas do vi.fn()
  });

  it('Não deve armazenar mais do que 20 itens no localStorage', () => {
    const { getByText, getByTestId } = render(
      <HistoryProvider>
        <TestComponent />
      </HistoryProvider>
    );

    const button = getByText('Gerar');

    // Simulamos o usuário gerando 25 CPFs em sequência
    act(() => {
      for (let i = 0; i < 25; i++) {
        fireEvent.click(button);
      }
    });

    // O limite máximo de 20 deve ser mantido
    expect(getByTestId('tamanho').textContent).toBe('20');
    
    // Validando se o localStorage mockado foi chamado e gravou os itens
    expect(window.localStorage.setItem).toHaveBeenCalled();
    
    // Podemos testar se o localStorage efetivamente tem apenas 20 itens
    const storedHistory = JSON.parse(window.localStorage.getItem('simulae_history'));
    expect(storedHistory.length).toBe(20);
  });
});
