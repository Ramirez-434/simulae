import { createContext, useContext, useState, useCallback } from 'react';

const ChatSimulationContext = createContext();

export function ChatSimulationProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [contactName, setContactName] = useState('Contato Simulado');

  const parseRawText = useCallback((rawChatText) => {
    if (!rawChatText) return setMessages([]);
    const lines = rawChatText.split('\n').filter(line => line.trim() !== '');
    const newMessages = lines.map((line, index) => {
      const timeMatch = line.match(/\[(\d{2}:\d{2})\]/);
      const time = timeMatch ? timeMatch[1] : '';
      const textWithoutTime = line.replace(/\[\d{2}:\d{2}\]\s*/, '');
      const isMe = textWithoutTime.startsWith('Você:') || index % 2 !== 0; 
      const cleanText = textWithoutTime.replace(/.*?:\s*/, '');
      return { id: crypto.randomUUID(), time, text: cleanText, isMe };
    });
    setMessages(newMessages);
  }, []);

  const updateMessageText = useCallback((id, newText) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, text: newText } : m));
  }, []);

  const toggleSender = useCallback((id) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isMe: !m.isMe } : m));
  }, []);

  const addMessage = useCallback(() => {
    const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { id: crypto.randomUUID(), time, text: "Nova mensagem", isMe: true }]);
  }, []);

  return (
    <ChatSimulationContext.Provider value={{
      messages,
      contactName,
      setContactName,
      parseRawText,
      updateMessageText,
      toggleSender,
      addMessage
    }}>
      {children}
    </ChatSimulationContext.Provider>
  );
}

export const useChatSimulation = () => useContext(ChatSimulationContext);
