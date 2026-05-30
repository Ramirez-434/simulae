import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import CopyButton from './CopyButton';

export default function ColorPalette({ title, description }) {
  const generatePalette = () => Array.from({ length: 5 }, () => 
    '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
  );
  
  const [colors, setColors] = useState(generatePalette());

  const handleGenerate = () => {
    setColors(generatePalette());
  };

  return (
    <div className="glass-panel p-6 rounded-xl flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
        {description && <p className="text-sm text-slate-400 mt-1">{description}</p>}
      </div>

      <div className="flex gap-2 h-16 rounded-md overflow-hidden shadow-inner mt-2">
        {colors.map((color, idx) => (
          <div 
            key={idx} 
            style={{ backgroundColor: color }} 
            className="flex-1 flex items-end justify-center pb-2 transition-all hover:flex-[1.5]"
            title={color}
          >
            <span className="text-[10px] font-mono bg-black/50 text-white px-1 rounded backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity">
              {color.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-auto">
        <div className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg p-3 font-mono text-sm text-emerald-400 overflow-hidden text-ellipsis whitespace-nowrap">
          {colors.join(', ').toUpperCase()}
        </div>
        <CopyButton text={colors.join(', ').toUpperCase()} />
        <button
          onClick={handleGenerate}
          className="p-2 rounded-md hover:bg-slate-700 text-slate-300 transition-colors"
          title="Gerar Novo"
        >
          <RefreshCw size={18} />
        </button>
      </div>
    </div>
  );
}
