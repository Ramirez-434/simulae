import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import CopyButton from './CopyButton';
import BulkDownload from './BulkDownload';
import useCardShortcuts from '../hooks/useCardShortcuts';
import { useHistory } from '../context/HistoryContext';

export default function CardGenerator({ title, description, generatorFn, allowBulk = true, children }) {
  const [value, setValue] = useState('');
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
      className={`glass-panel p-6 rounded-xl flex flex-col gap-4 transition-all duration-300 ${isHovered ? 'ring-1 ring-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2 font-satoshi">
          {title}
          {isHovered && <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded ml-auto font-sans">Ativo</span>}
        </h3>
        <p className="text-sm text-slate-400 mt-1">{description}</p>
      </div>

      <div className="flex items-center gap-2 mt-auto">
        <div className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg p-3 font-mono text-lg text-emerald-400 overflow-hidden text-ellipsis whitespace-nowrap">
          {value}
        </div>
        {allowBulk && <BulkDownload title={title} generatorFn={generatorFn} />}
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
