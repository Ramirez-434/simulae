import { useEffect } from 'react';

export default function useCardShortcuts(isHovered, handleGenerate, value) {
  useEffect(() => {
    if (!isHovered) return;

    const handleKeyDown = async (e) => {
      // Spacebar para gerar novo (evitando se o user estiver num input/textarea)
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault(); // evita rolar a página
        handleGenerate();
      }
      
      // Ctrl+C ou Cmd+C para copiar
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
        // Apenas copiamos se ele não tiver algum texto selecionado manualmente
        const selection = window.getSelection().toString();
        if (!selection && value) {
          e.preventDefault();
          try {
            await navigator.clipboard.writeText(value);
            // Poderíamos disparar um toast aqui no futuro
          } catch (err) {
            console.error('Failed to copy via shortcut', err);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHovered, handleGenerate, value]);
}
