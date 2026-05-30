import { createContext, useContext, useState, useEffect } from 'react';

const HistoryContext = createContext();

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('simulae_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse history', e);
      }
    }
  }, []);

  const addHistoryItem = (title, value) => {
    // Only save strings/numbers, not complex arrays/objects for simplicity
    if (typeof value !== 'string' && typeof value !== 'number') return;
    if (value === 'Gerando...' || value === 'Erro ao gerar') return;
    
    setHistory((prev) => {
      const newItem = {
        id: Date.now().toString(),
        title,
        value: String(value).substring(0, 500), // limit length just in case
        timestamp: new Date().toISOString()
      };
      // Keep only last 20 items
      const updated = [newItem, ...prev].slice(0, 20);
      localStorage.setItem('simulae_history', JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('simulae_history');
  };

  return (
    <HistoryContext.Provider value={{ history, addHistoryItem, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
}

export const useHistory = () => useContext(HistoryContext);
