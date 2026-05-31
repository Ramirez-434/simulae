import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, YAxis } from 'recharts';
import useCardShortcuts from '../hooks/useCardShortcuts';
import { useHistory } from '../context/HistoryContext';

export default function ChartGenerator({ title, description, generatorFn }) {
  const [data, setData] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const { addHistoryItem } = useHistory();

  const handleGenerate = () => {
    const result = generatorFn();
    setData(result);
    // Para o histórico, podemos salvar uma versão resumida em string
    const stringified = result.map(d => `${d.name}: ${d.value}`).join(', ');
    addHistoryItem(title, stringified);
  };

  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useCardShortcuts(isHovered, handleGenerate, data);

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

      <div className="flex flex-col gap-2 mt-auto">
        <div className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg p-3 w-full h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} width={30} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9' }}
                itemStyle={{ color: '#34d399' }}
              />
              <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-2 justify-end">
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
      </div>
    </motion.div>
  );
}
