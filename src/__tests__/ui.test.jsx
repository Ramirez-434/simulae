import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CardGeneratorWhatsApp from '../components/CardGeneratorWhatsApp';
import PlacaVisual from '../components/PlacaVisual';
import CardGenerator from '../components/CardGenerator';
import { HistoryProvider } from '../context/HistoryContext';

describe('Testes de Interface (Camada 3)', () => {

  it('O WhatsAppMockup deve realizar o parsing corretamente e separar as bolhas de chat', async () => {
    // Fake generator that returns a simulated WhatsApp chat
    // Index 0: João (falls to isMe=false)
    // Index 1: Você (falls to isMe=true)
    const fakeGenerator = () => "[10:30] João: Olá, tudo bem?\n[10:31] Você: Tudo ótimo!";
    
    render(
      <HistoryProvider>
        <CardGeneratorWhatsApp title="Chat" generatorFn={fakeGenerator} />
      </HistoryProvider>
    );

    // Espera a renderização
    const contactMessage = await screen.findByText('Olá, tudo bem?');
    const myMessage = await screen.findByText('Tudo ótimo!');

    expect(myMessage).toBeTruthy();
    expect(contactMessage).toBeTruthy();

    // Bolha "Você" (verde) deve ter a classe correspondente
    const myBubble = myMessage.closest('div');
    expect(myBubble.className).toContain('bg-[#DCF8C6]');

    // Bolha contato (branca)
    const contactBubble = contactMessage.closest('div');
    expect(contactBubble.className).toContain('bg-white');

    // Testando os horários
    const time1 = screen.getByText('10:30');
    expect(time1).toBeTruthy();
  });

  it('A PlacaVisual deve renderizar a tarja azul do Mercosul puramente em CSS', async () => {
    const fakePlate = () => "ABC1D23";
    
    render(<PlacaVisual generatorFn={fakePlate} />);
    
    const plateTexts = await screen.findAllByText('ABC1D23');
    expect(plateTexts.length).toBeGreaterThan(0);

    // Verificando a tarja azul (bg-[#003399])
    const headerElement = screen.getByText('BRASIL').closest('div');
    expect(headerElement.className).toContain('bg-[#003399]');
  });

  it('Interações de Hover e Atalho de Teclado no CardGenerator', async () => {
    const generatorMock = vi.fn().mockReturnValue('DadoGerado');
    
    render(
      <HistoryProvider>
        <CardGenerator title="Teste Hover" description="Desc" generatorFn={generatorMock} />
      </HistoryProvider>
    );

    // O gerador roda 1 vez no useEffect de montagem
    expect(generatorMock).toHaveBeenCalledTimes(1);

    const card = screen.getByText('Teste Hover').closest('.glass-panel');
    
    // Simular o hover
    fireEvent.mouseEnter(card);
    
    // O texto "Ativo" deve aparecer na UI quando hover é true
    // O texto "Ativo" pode estar na tela
    const activeTexts = await screen.findAllByText('Ativo');
    expect(activeTexts.length).toBeGreaterThan(0);

    // Com o card hovered, a tecla Space deve acionar o gerador novamente
    act(() => {
      fireEvent.keyDown(window, { code: 'Space' });
    });
    
    expect(generatorMock).toHaveBeenCalledTimes(2);

    // Remover o hover
    fireEvent.mouseLeave(card);
    
    // Tecla Space agora não deve fazer nada
    act(() => {
      fireEvent.keyDown(window, { code: 'Space' });
    });

    expect(generatorMock).toHaveBeenCalledTimes(2); // Continua 2
  });

});
