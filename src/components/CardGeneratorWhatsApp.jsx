import { useState, useEffect, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import CopyButton from './CopyButton';
import useCardShortcuts from '../hooks/useCardShortcuts';
import { motion } from 'framer-motion';

function WhatsAppMockup({ rawChatText }) {
  const messages = useMemo(() => {
    if (!rawChatText) return [];
    const lines = rawChatText.split('\n').filter(line => line.trim() !== '');
    return lines.map((line, index) => {
      const timeMatch = line.match(/\[(\d{2}:\d{2})\]/);
      const time = timeMatch ? timeMatch[1] : '';
      const textWithoutTime = line.replace(/\[\d{2}:\d{2}\]\s*/, '');
      const isMe = textWithoutTime.startsWith('Você:') || index % 2 !== 0; 
      const cleanText = textWithoutTime.replace(/.*?:\s*/, '');
      return { id: index, time, cleanText, isMe };
    });
  }, [rawChatText]);

  return (
    <div className="w-full mt-2 mb-4 rounded-xl overflow-hidden border border-slate-700 shadow-lg flex flex-col font-sans">
      {/* Cabeçalho */}
      <div className="bg-[#075E54] dark:bg-[#1f2c34] p-3 flex items-center text-white font-semibold text-sm">
        <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600 mr-3"></div>
        <span>Contato Simulado</span>
      </div>

      {/* Corpo do Chat */}
      <div className="bg-[#E5DDD5] dark:bg-[#0b141a] p-4 flex flex-col space-y-3 max-h-80 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`relative max-w-[80%] px-3 py-2 rounded-lg shadow-sm text-sm 
                ${msg.isMe 
                  ? 'bg-[#DCF8C6] text-black dark:bg-[#005c4b] dark:text-white rounded-tr-none' 
                  : 'bg-white text-black dark:bg-[#202c33] dark:text-white rounded-tl-none'}`}
            >
              <p className="pb-3 break-words leading-relaxed">{msg.cleanText}</p>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 absolute bottom-1 right-2">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CardGeneratorWhatsApp({ title, description, generatorFn }) {
  const [value, setValue] = useState('Gerando...');
  const [isHovered, setIsHovered] = useState(false);

  const handleGenerate = async () => {
    try {
      const result = generatorFn();
      if (result instanceof Promise) {
        setValue('Gerando...');
        const resolved = await result;
        setValue(resolved);
      } else {
        setValue(result);
      }
    } catch (error) {
      setValue('Erro ao gerar');
    }
  };

  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useCardShortcuts(isHovered, handleGenerate, value);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={`glass-panel p-6 rounded-xl flex flex-col gap-4 transition-all duration-300 ${isHovered ? 'ring-1 ring-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)]' : ''} md:col-span-2 lg:col-span-1`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
          {title}
          {isHovered && <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded ml-auto">Ativo</span>}
        </h3>
        {description && <p className="text-sm text-slate-400 mt-1">{description}</p>}
      </div>

      <WhatsAppMockup rawChatText={value} />

      <div className="flex gap-2 justify-end mt-auto">
        <CopyButton text={value} />
        <motion.button
          whileTap={{ scale: 0.85, rotate: 90 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={handleGenerate}
          className="p-2 rounded-md hover:bg-slate-700 text-slate-300 transition-colors"
          title="Gerar Novo (Space)"
        >
          <RefreshCw size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
}
