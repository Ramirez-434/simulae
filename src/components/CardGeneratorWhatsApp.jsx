import { useState, useEffect } from 'react';
import { RefreshCw, ArrowLeft, Video, Phone, MoreVertical, CheckCheck, Smile, Paperclip, Camera, Mic, ArrowLeftRight, Wifi, Battery, SignalHigh, Play, FileText, Image as ImageIcon } from 'lucide-react';
import CopyButton from './CopyButton';
import useCardShortcuts from '../hooks/useCardShortcuts';
import { motion } from 'framer-motion';
import { useHistory } from '../context/HistoryContext';
import { ChatSimulationProvider, useChatSimulation } from '../context/ChatSimulationContext';
import MockupControls from './MockupControls';

function WhatsAppMockup() {
  const { 
    messages, contactName, updateMessageText, toggleSender,
    showHeader, showFooter, showStatusBar, contactStatus, osType
  } = useChatSimulation();

  // Wallpaper pattern sutil
  const bgPattern = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.83-53.797 53.796-.83-.829L54.627 0zM3.46 0l.83.83-2.63 2.63-.83-.83L3.46 0zm54.166 60l-.83-.83 2.63-2.63.83.83-2.63 2.63z' fill='%239C92AC' fill-opacity='0.08' fill-rule='evenodd'/%3E%3C/svg%3E";

  return (
    <div className="w-full mt-2 mb-4 rounded-xl overflow-hidden border border-slate-700 shadow-xl flex flex-col font-sans select-none relative" style={{ height: '450px' }}>
      
      {/* Status Bar (OS) */}
      {showStatusBar && (
        <div className={`px-4 py-1 flex justify-between items-center text-[11px] font-medium z-20 ${
          osType === 'ios' ? 'bg-[#075E54] dark:bg-[#202c33] text-white/90' : 'bg-[#054c44] dark:bg-[#111b21] text-white/90'
        }`}>
          {osType === 'ios' ? (
            <>
              <span>10:45</span>
              <div className="flex items-center gap-1.5">
                <SignalHigh size={12} />
                <Wifi size={12} />
                <Battery size={14} />
              </div>
            </>
          ) : (
            <>
              <span>10:45</span>
              <div className="flex items-center gap-1.5">
                <Wifi size={12} />
                <SignalHigh size={12} />
                <Battery size={14} />
                <span className="ml-0.5 text-[10px]">100%</span>
              </div>
            </>
          )}
        </div>
      )}

      {/* Cabeçalho */}
      {showHeader && (
        <div className="bg-[#075E54] dark:bg-[#202c33] p-2 flex items-center text-white z-10 shadow-sm relative">
          <ArrowLeft size={20} className="mr-1 opacity-80 cursor-pointer" />
          <div className="w-9 h-9 rounded-full bg-slate-300 dark:bg-slate-600 mr-3 flex-shrink-0 cursor-pointer"></div>
          <div className="flex flex-col flex-1 leading-tight cursor-pointer">
            <span className="font-semibold text-[15px] truncate max-w-[150px]">{contactName}</span>
            {contactStatus && <span className="text-[11px] opacity-80">{contactStatus}</span>}
          </div>
          <div className="flex items-center gap-5 px-2 opacity-80 cursor-pointer">
            <Video size={19} />
            <Phone size={18} />
            <MoreVertical size={20} />
          </div>
        </div>
      )}

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
            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} ${isFirstInSequence ? 'mt-2' : ''} group relative`}>
              {/* Botão de inversão de remetente visível apenas no hover */}
              <button 
                onClick={() => toggleSender(msg.id)}
                className={`absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-slate-300 rounded-full p-1 shadow-md z-20 ${msg.isMe ? 'right-full mr-2' : 'left-full ml-2'}`}
                title="Inverter Remetente"
              >
                <ArrowLeftRight size={14} />
              </button>

              <div className={`relative max-w-[85%] ${msg.type === 'image' ? 'p-1' : 'px-2.5 pt-1.5 pb-2'} rounded-lg shadow-sm text-[14.5px] leading-snug tracking-tight
                  ${msg.isMe 
                    ? 'bg-[#DCF8C6] text-black dark:bg-[#005c4b] dark:text-[#e9edef]' 
                    : 'bg-white text-black dark:bg-[#202c33] dark:text-[#e9edef]'}
                  ${tailClass}`}
              >
                {/* TEXT TYPE */}
                {(!msg.type || msg.type === 'text') && (
                  <span 
                    className="break-words outline-none cursor-text block min-w-[20px]"
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => updateMessageText(msg.id, e.currentTarget.textContent)}
                  >
                    {msg.text}
                  </span>
                )}

                {/* AUDIO TYPE */}
                {msg.type === 'audio' && (
                  <div className="flex items-center gap-3 w-56 sm:w-64 py-1">
                    <div className="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-600 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <Mic size={20} className="text-white opacity-50" />
                    </div>
                    <Play size={24} className="text-gray-500 dark:text-gray-400 cursor-pointer flex-shrink-0" fill="currentColor" />
                    <div className="flex-1 flex items-center gap-0.5 h-6">
                      {[2, 4, 3, 6, 8, 10, 6, 3, 5, 8, 12, 16, 14, 10, 8, 4, 2].map((h, i) => (
                        <div key={i} className={`w-1 rounded-full ${msg.isMe ? 'bg-[#128C7E] dark:bg-emerald-400' : 'bg-gray-400 dark:bg-gray-500'}`} style={{ height: `${h}px` }} />
                      ))}
                    </div>
                  </div>
                )}

                {/* IMAGE TYPE */}
                {msg.type === 'image' && (
                  <div className="flex flex-col">
                    <div className="aspect-square w-48 sm:w-56 rounded-md bg-gradient-to-tr from-blue-400 to-emerald-400 flex items-center justify-center overflow-hidden mb-1 relative cursor-pointer group">
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                      <ImageIcon size={48} className="text-white/80" />
                    </div>
                    <span 
                      className="break-words outline-none cursor-text block min-w-[20px] px-1 pb-1"
                      contentEditable={true}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => updateMessageText(msg.id, e.currentTarget.textContent)}
                    >
                      {msg.text}
                    </span>
                  </div>
                )}

                {/* DOCUMENT TYPE */}
                {msg.type === 'document' && (
                  <div className="flex items-center gap-3 bg-black/5 dark:bg-white/5 rounded-md p-2 mb-1 w-56 sm:w-64 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                    <div className="bg-[#E53935] text-white p-2 rounded flex-shrink-0">
                      <FileText size={24} />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span 
                        className="text-[14px] font-semibold truncate outline-none cursor-text"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => updateMessageText(msg.id, e.currentTarget.textContent)}
                      >
                        {msg.text}
                      </span>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400">2.4 MB • PDF</span>
                    </div>
                  </div>
                )}

                {/* TIMESTAMPS */}
                <span className={`text-[10px] text-gray-500 dark:text-[#8696a0] ml-3 float-right translate-y-1 flex items-center gap-1 ${msg.type === 'image' && msg.text === 'Imagem anexa' ? 'absolute bottom-2 right-2 bg-black/30 text-white rounded-full px-2 py-0.5' : ''}`}>
                  {msg.time}
                  {msg.isMe && <CheckCheck size={14} className={msg.type === 'image' && msg.text === 'Imagem anexa' ? 'text-white' : 'text-[#53bdeb]'} />}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Rodapé (Barra de Digitação) */}
      {showFooter && (
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
      )}
    </div>
  );
}

function CardGeneratorWhatsAppInner({ title, description, generatorFn }) {
  const [value, setValue] = useState('Gerando...');
  const [isHovered, setIsHovered] = useState(false);
  const { addHistoryItem } = useHistory();
  const { parseRawText } = useChatSimulation();

  const handleGenerate = async () => {
    try {
      const result = generatorFn();
      if (result instanceof Promise) {
        setValue('Gerando...');
        const resolved = await result;
        setValue(resolved);
        parseRawText(resolved);
        addHistoryItem(title, resolved);
      } else {
        setValue(result);
        parseRawText(result);
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
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          {title}
          {isHovered && <span className="text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded ml-auto">Ativo</span>}
        </h3>
        {description && <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{description}</p>}
      </div>

      <MockupControls />
      <WhatsAppMockup />

      <div className="flex gap-2 justify-end mt-auto">
        <CopyButton text={value} />
        <motion.button
          whileTap={{ scale: 0.85, rotate: 90 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={handleGenerate}
          className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
          title="Gerar Novo (Space)"
        >
          <RefreshCw size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function CardGeneratorWhatsApp(props) {
  return (
    <ChatSimulationProvider>
      <CardGeneratorWhatsAppInner {...props} />
    </ChatSimulationProvider>
  );
}
