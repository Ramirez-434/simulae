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

  // Wallpaper pattern sutil (opacity 0.012)
  const bgPattern = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.83-53.797 53.796-.83-.829L54.627 0zM3.46 0l.83.83-2.63 2.63-.83-.83L3.46 0zm54.166 60l-.83-.83 2.63-2.63.83.83-2.63 2.63z' fill='%239C92AC' fill-opacity='0.012' fill-rule='evenodd'/%3E%3C/svg%3E";

  // Fontes nativas por SO
  const fontFamily = osType === 'ios'
    ? '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro", sans-serif'
    : 'Roboto, "Helvetica Neue", Arial, sans-serif';

  return (
    <div 
      className="w-full mt-2 mb-4 rounded-xl overflow-hidden border border-black/5 dark:border-white/5 flex flex-col select-none relative" 
      style={{ height: '450px', fontFamily }}
    >
      
      {/* Status Bar (OS) */}
      {showStatusBar && (
        <div className={`px-5 py-1 flex justify-between items-center text-[12px] font-medium z-20 ${
          osType === 'ios'
            ? 'bg-[#f6f6f6]/90 text-black dark:bg-[#1c1c1e]/90 dark:text-white'
            : 'bg-[#054c44] dark:bg-[#111b21] text-white/90'
        }`}>
          {osType === 'ios' ? (
            <>
              <span className="font-semibold">09:41</span>
              {/* Dynamic Island simulada */}
              <div className="w-[96px] h-[28px] bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-1.5"></div>
              <div className="flex items-center gap-1.5">
                <SignalHigh size={14} />
                <Wifi size={14} />
                <Battery size={16} />
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
        <div
          className={`px-3 py-2 h-[60px] flex items-center z-10 shadow-sm relative ${
            osType === 'ios'
              ? 'border-b border-gray-200 dark:border-gray-800'
              : 'bg-[#075E54] dark:bg-[#202c33] text-white'
          }`}
          style={osType === 'ios' ? {
            backgroundColor: 'rgba(246,246,246,0.85)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          } : {}}
        >
          {/* Botão Voltar - iOS style */}
          {osType === 'ios' ? (
            <div className="flex items-center cursor-pointer mr-2" style={{ color: '#007AFF' }}>
              <ArrowLeft size={22} strokeWidth={2} />
              <span className="text-[16px] font-normal ml-0.5">Voltar</span>
            </div>
          ) : (
            <ArrowLeft size={22} strokeWidth={1.5} className="mr-1 opacity-80 cursor-pointer" />
          )}

          <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600 mr-2.5 flex-shrink-0 cursor-pointer"></div>
          <div className="flex flex-col flex-1 leading-tight cursor-pointer">
            <span className={`truncate max-w-[150px] tracking-tight ${
              osType === 'ios'
                ? 'text-[15px] font-semibold text-black dark:text-white'
                : 'text-[15px] font-semibold text-white'
            }`}>{contactName}</span>
            {contactStatus && (
              <span className={`text-[11px] mt-[-1px] ${
                osType === 'ios' ? 'text-gray-400 dark:text-gray-500' : 'text-white/70'
              }`}>{contactStatus}</span>
            )}
          </div>
          {/* Ícones do cabeçalho */}
          <div className="flex items-center gap-4 px-1 cursor-pointer" style={{ color: osType === 'ios' ? '#007AFF' : 'rgba(255,255,255,0.85)' }}>
            <Video size={24} strokeWidth={1.5} />
            <Phone size={20} strokeWidth={1.5} />
            {osType !== 'ios' && <MoreVertical size={20} strokeWidth={1.5} />}
          </div>
        </div>
      )}

      {/* Corpo do Chat */}
      <div className="bg-[#EFEAE2] dark:bg-[#0b141a] flex-1 px-3 pb-2 pt-1 flex flex-col space-y-0 overflow-y-auto no-scrollbar relative" style={{ backgroundImage: `url("${bgPattern}")` }}>
        
        {/* Marcador de Data */}
        <div className="flex justify-center mb-2 mt-1">
          <span className={`text-[11px] px-3 py-1 rounded-full ${
            osType === 'ios'
              ? 'bg-white/70 text-[#8696a0]'
              : 'bg-[#d4e8f0] dark:bg-[#182229] text-[#546b72] dark:text-gray-400 shadow-[0_1px_2px_rgba(0,0,0,0.12)]'
          }`}>
            Hoje
          </span>
        </div>

        {messages.map((msg, index) => {
          const isFirstInSequence = index === 0 || messages[index - 1].isMe !== msg.isMe;
          const tailClass = isFirstInSequence 
            ? (msg.isMe ? 'rounded-tr-[4px]' : 'rounded-tl-[4px]') 
            : 'rounded-2xl';
            
          return (
            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} ${isFirstInSequence ? 'mt-1.5' : 'mt-0.5'} group relative`}>
              {/* Botão de inversão de remetente visível apenas no hover */}
              <button 
                onClick={() => toggleSender(msg.id)}
                className={`absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-slate-300 rounded-full p-1 shadow-md z-20 ${msg.isMe ? 'right-full mr-2' : 'left-full ml-2'}`}
                title="Inverter Remetente"
              >
                <ArrowLeftRight size={14} />
              </button>

              {/* BALLOON INNER — flex col, metadata pinned bottom-right */}
              <div className={`relative max-w-[85%] rounded-2xl shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] text-[14.2px] leading-[19px] overflow-hidden
                  ${msg.isMe 
                    ? (osType === 'ios' ? 'bg-[#E1F7CB] text-black dark:bg-[#005c4b] dark:text-[#e9edef]' : 'bg-[#D9FDD3] text-black dark:bg-[#005c4b] dark:text-[#e9edef]')
                    : 'bg-white text-black dark:bg-[#202c33] dark:text-[#e9edef]'}
                  ${tailClass}`}
              >
                {/* SVG Tail */}
                {isFirstInSequence && (
                  msg.isMe ? (
                    <svg viewBox="0 0 8 13" width="8" height="13" className={`absolute top-0 -right-2 ${osType === 'ios' ? 'text-[#E1F7CB]' : 'text-[#D9FDD3]'} dark:text-[#005c4b] fill-current`}>
                      <path d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 8 13" width="8" height="13" className="absolute top-0 -left-2 text-white dark:text-[#202c33] fill-current">
                      <path d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z" transform="scale(-1, 1) translate(-8, 0)" />
                    </svg>
                  )
                )}

                {/* IMAGE TYPE — full bleed sem padding */}
                {msg.type === 'image' ? (
                  <div className="flex flex-col">
                    <div className="aspect-square w-48 sm:w-56 rounded-lg bg-gradient-to-tr from-blue-400 to-emerald-400 flex items-center justify-center overflow-hidden relative cursor-pointer group">
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                      <ImageIcon size={48} className="text-white/80" />
                      {/* Timestamp sobre a imagem */}
                      <span className="absolute bottom-1.5 right-1.5 bg-black/40 text-white text-[10px] rounded-full px-1.5 py-0.5 flex items-center gap-0.5">
                        {msg.time}
                        {msg.isMe && <CheckCheck size={12} className="text-white" />}
                      </span>
                    </div>
                    {msg.text && msg.text !== 'Imagem anexa' && (
                      <span
                        className="break-words outline-none cursor-text block min-w-[20px] px-2 pt-1 pb-1 text-[14.2px]"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => updateMessageText(msg.id, e.currentTarget.textContent)}
                      >
                        {msg.text}
                      </span>
                    )}
                  </div>
                ) : (
                  /* Todos os outros tipos: padding + meta na bottom */
                  <div className="px-2 pt-1.5 pb-1">

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
                      <div className="flex items-center gap-2 w-52 sm:w-[240px] py-0.5">
                        <div className="relative flex-shrink-0">
                          <div className="w-9 h-9 rounded-full bg-slate-400/70 dark:bg-slate-600 flex items-center justify-center">
                            <Mic size={18} className="text-white" />
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#53bdeb] rounded-full flex items-center justify-center border-[1.5px] border-[#D9FDD3] dark:border-[#005c4b]">
                            <Mic size={7} className="text-white" />
                          </div>
                        </div>
                        <Play size={16} className="text-gray-500 dark:text-gray-400 cursor-pointer flex-shrink-0" fill="currentColor" />
                        <div className="flex flex-col flex-1 min-w-0">
                          <div className="flex items-end gap-[1.5px] h-5">
                            {[2,3,5,8,11,14,12,9,6,4,7,10,13,15,11,8,5,3,6,9,12,10,7,4,2].map((h, i) => (
                              <div key={i} className="w-[1.5px] rounded-full bg-gray-400/80 dark:bg-gray-500" style={{ height: `${Math.max(2, h * 0.85)}px` }} />
                            ))}
                          </div>
                          <span className="text-[10px] text-gray-400 mt-0.5">0:15</span>
                        </div>
                      </div>
                    )}

                    {/* DOCUMENT TYPE — ícone círculo cinza estilo WhatsApp */}
                    {msg.type === 'document' && (
                      <div className="flex items-center gap-2.5 w-56 sm:w-64 cursor-pointer py-0.5">
                        {/* Círculo cinza com ícone branco minimalista */}
                        <div className="w-10 h-10 rounded-full bg-slate-400/80 dark:bg-slate-500 flex items-center justify-center flex-shrink-0">
                          <FileText size={20} strokeWidth={1.5} className="text-white" />
                        </div>
                        <div className="flex flex-col flex-1 overflow-hidden">
                          <span
                            className="text-[13.5px] font-medium truncate outline-none cursor-text leading-tight"
                            contentEditable={true}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => updateMessageText(msg.id, e.currentTarget.textContent)}
                          >
                            {msg.text}
                          </span>
                          <span className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">2.4 MB • PDF</span>
                        </div>
                      </div>
                    )}

                    {/* TIMESTAMP compacto — alinhado flex-end abaixo do conteúdo */}
                    <div className="flex justify-end items-center gap-0.5 mt-0.5">
                      <span className={`text-[10.5px] leading-none ${
                        msg.isMe ? 'text-[#7fa37e] dark:text-[#8696a0]' : 'text-gray-400 dark:text-[#8696a0]'
                      }`}>{msg.time}</span>
                      {msg.isMe && <CheckCheck size={13} className="text-[#53bdeb] flex-shrink-0" />}
                    </div>

                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Rodapé (Barra de Digitação) */}
      {showFooter && (
        <div className={`p-2 px-3 flex items-center gap-2 z-10 w-full relative ${
          osType === 'ios' ? 'bg-white/80 border-t border-gray-200 dark:border-gray-800 dark:bg-[#1c1c1e]/80' : 'bg-[#F0F2F5] dark:bg-[#202c33]'
        }`} style={osType === 'ios' ? { backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' } : {}}>
          {/* iOS: botão + à esquerda */}
          {osType === 'ios' && (
            <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 cursor-pointer" style={{ borderColor: '#007AFF', color: '#007AFF' }}>
              <span className="text-lg font-light leading-none mb-0.5">+</span>
            </div>
          )}
          <div className={`flex-1 flex items-center px-2 py-1.5 relative ${
            osType === 'ios'
              ? 'bg-white dark:bg-[#2a3942] rounded-full border border-gray-300 dark:border-gray-700'
              : 'bg-white dark:bg-[#2a3942] rounded-full shadow-sm'
          }`}>
            {osType !== 'ios' && (
              <Smile size={24} className="text-gray-500 dark:text-[#8696a0] mx-1 flex-shrink-0 cursor-pointer" />
            )}
            <div className="flex-1 text-[15px] text-gray-400 dark:text-[#8696a0] cursor-text px-2">
              Mensagem
            </div>
            <div className="flex items-center gap-2.5 pr-1">
              {osType === 'ios' ? (
                <>
                  <Camera size={22} strokeWidth={1.5} className="flex-shrink-0 cursor-pointer" style={{ color: '#007AFF' }} />
                  <Mic size={20} strokeWidth={1.5} className="flex-shrink-0 cursor-pointer" style={{ color: '#007AFF' }} />
                </>
              ) : (
                <>
                  <Paperclip size={20} className="text-gray-500 dark:text-[#8696a0] flex-shrink-0 cursor-pointer" />
                  <Camera size={22} className="text-gray-500 dark:text-[#8696a0] flex-shrink-0 cursor-pointer" />
                </>
              )}
            </div>
          </div>
          {/* Android: botão mic verde separado */}
          {osType !== 'ios' && (
            <div className="w-10 h-10 rounded-full bg-[#00A884] flex items-center justify-center flex-shrink-0 text-white cursor-pointer shadow-sm">
              <Mic size={20} />
            </div>
          )}
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
