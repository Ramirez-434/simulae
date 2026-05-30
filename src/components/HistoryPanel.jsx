import { X, Trash2, Clock, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHistory } from '../context/HistoryContext';
import { useState } from 'react';
import { toast } from 'sonner';

function HistoryItemCopy({ value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success('Copiado do histórico!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={handleCopy} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-md text-slate-300 transition-colors">
      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
    </button>
  );
}

export default function HistoryPanel({ isOpen, onClose }) {
  const { history, clearHistory } = useHistory();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-slate-900 border-l border-slate-800 shadow-2xl z-50 flex flex-col"
          >
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Clock size={18} className="text-emerald-400" /> Histórico Local
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {history.length === 0 ? (
                <div className="text-center text-slate-500 py-10 text-sm">
                  Seu histórico está vazio.<br/>Os últimos 20 itens gerados aparecerão aqui.
                </div>
              ) : (
                history.map((item) => (
                  <div key={item.id} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-semibold text-emerald-400">{item.title}</span>
                      <span className="text-[10px] text-slate-500">
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-950 p-2 rounded text-sm text-slate-300 font-mono overflow-hidden text-ellipsis whitespace-nowrap">
                        {item.value}
                      </div>
                      <HistoryItemCopy value={item.value} />
                    </div>
                  </div>
                ))
              )}
            </div>

            {history.length > 0 && (
              <div className="p-4 border-t border-slate-800">
                <button
                  onClick={clearHistory}
                  className="w-full py-2 flex items-center justify-center gap-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                >
                  <Trash2 size={16} />
                  Limpar Histórico
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
