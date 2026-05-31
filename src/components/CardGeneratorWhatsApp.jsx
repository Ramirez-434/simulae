import { useState, useEffect, useMemo } from 'react';
import { RefreshCw, ArrowLeft, Video, Phone, MoreVertical, CheckCheck, Smile, Paperclip, Camera, Mic } from 'lucide-react';
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

  // Wallpaper pattern sutil
  const bgPattern = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.83-53.797 53.796-.83-.829L54.627 0zM3.46 0l.83.83-2.63 2.63-.83-.83L3.46 0zm54.166 60l-.83-.83 2.63-2.63.83.83-2.63 2.63z' fill='%239C92AC' fill-opacity='0.08' fill-rule='evenodd'/%3E%3C/svg%3E";

  return (
    <div className="w-full mt-2 mb-4 rounded-xl overflow-hidden border border-slate-700 shadow-xl flex flex-col font-sans select-none relative" style={{ height: '450px' }}>
      
      {/* Cabeçalho */}
      <div className="bg-[#075E54] dark:bg-[#202c33] p-2 flex items-center text-white z-10 shadow-sm relative">
        <ArrowLeft size={20} className="mr-1 opacity-80 cursor-pointer" />
        <div className="w-9 h-9 rounded-full bg-slate-300 dark:bg-slate-600 mr-3 flex-shrink-0 cursor-pointer"></div>
        <div className="flex flex-col flex-1 leading-tight cursor-pointer">
          <span className="font-semibold text-[15px]">Contato Simulado</span>
          <span className="text-[11px] opacity-80">visto por último hoje às 10:00</span>
        </div>
        <div className="flex items-center gap-5 px-2 opacity-80 cursor-pointer">
          <Video size={19} />
          <Phone size={18} />
          <MoreVertical size={20} />
        </div>
      </div>

      {/* Corpo do Chat */}
      <div className="bg-[#E5DDD5] dark:bg-[#0b141a] flex-1 p-3 flex flex-col space-y-1 overflow-y-auto relative" style={{ backgroundImage: `url("${bgPattern}")` }}>
        
        {/* Marcador de Data */}
        <div className="flex justify-center mb-3 mt-1">
          <span className="bg-[#E1F3FB] dark:bg-[#182229] text-[#556269] dark:text-gray-400 text-[11px] px-3 py-1 rounded-lg shadow-sm">
            Hoje
          </span>
        </div>

        {messages.map((msg, index) => {
          const isFirstInSequence = index === 0 || messages[index - 1].isMe !== msg.isMe;
          const tailClass = isFirstInSequence 
            ? (msg.isMe ? 'rounded-tr-none' : 'rounded-tl-none') 
            : '';
            
          return (
            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} ${isFirstInSequence ? 'mt-2' : ''}`}>
              <div className={`relative max-w-[85%] px-2.5 pt-1.5 pb-2 rounded-lg shadow-sm text-[14.5px] leading-snug tracking-tight
                  ${msg.isMe 
                    ? 'bg-[#DCF8C6] text-black dark:bg-[#005c4b] dark:text-[#e9edef]' 
                    : 'bg-white text-black dark:bg-[#202c33] dark:text-[#e9edef]'}
                  ${tailClass}`}
              >
                <span className="break-words">{msg.cleanText}</span>
                <span className="text-[10px] text-gray-500 dark:text-[#8696a0] ml-3 float-right translate-y-1 flex items-center gap-1">
                  {msg.time}
                  {msg.isMe && <CheckCheck size={14} className="text-[#53bdeb]" />}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Rodapé (Barra de Digitação) */}
      <div className="bg-[#f0f0f0] dark:bg-[#202c33] p-2 flex items-center gap-2 z-10">
        <Smile size={24} className="text-gray-500 dark:text-[#8696a0] mx-1 flex-shrink-0 cursor-pointer" />
        <Paperclip size={20} className="text-gray-500 dark:text-[#8696a0] mx-1 flex-shrink-0 cursor-pointer" />
        <div className="flex-1 bg-white dark:bg-[#2a3942] rounded-full px-4 py-2 text-sm text-gray-500 dark:text-[#8696a0] cursor-text">
          Mensagem
        </div>
        <Camera size={22} className="text-gray-500 dark:text-[#8696a0] mx-1 flex-shrink-0 cursor-pointer" />
        <div className="w-10 h-10 rounded-full bg-[#00A884] flex items-center justify-center flex-shrink-0 ml-1 text-white cursor-pointer shadow-sm">
          <Mic size={20} />
        </div>
      </div>
    </div>
  );
}

import { useHistory } from '../context/HistoryContext';

export default function CardGeneratorWhatsApp({ title, description, generatorFn }) {
  const [value, setValue] = useState('Gerando...');
  const [isHovered, setIsHovered] = useState(false);
  const { addHistoryItem } = useHistory();

  const handleGenerate = async () => {
    try {
      const result = generatorFn();
      if (result instanceof Promise) {
        setValue('Gerando...');
        const resolved = await result;
        setValue(resolved);
        addHistoryItem(title, resolved);
      } else {
        setValue(result);
        addHistoryItem(title, result);
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
