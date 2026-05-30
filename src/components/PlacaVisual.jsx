import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import CopyButton from './CopyButton';

export default function PlacaVisual({ generatorFn }) {
  const [plate, setPlate] = useState(generatorFn());

  const handleGenerate = () => {
    setPlate(generatorFn());
  };

  return (
    <div className="glass-panel p-6 rounded-xl flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-100">Placa Visual (Mercosul)</h3>
        <p className="text-sm text-slate-400 mt-1">Renderização em CSS</p>
      </div>

      <div className="flex flex-col items-center gap-4 mt-auto">
        {/* Placa Mercosul CSS */}
        <div className="w-[240px] h-[75px] bg-white rounded-md border-2 border-slate-800 shadow-md flex flex-col overflow-hidden relative">
          {/* Tarja Azul */}
          <div className="h-[22px] bg-[#003399] w-full flex justify-between items-center px-2">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/52/Mercosur_logo.svg" 
              alt="Mercosul" 
              className="h-3 opacity-90"
            />
            <span className="text-white font-bold text-[10px] tracking-widest">BRASIL</span>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg" 
              alt="BR" 
              className="h-3 rounded-sm opacity-90"
            />
          </div>
          {/* Texto da Placa */}
          <div className="flex-1 flex items-center justify-center bg-white">
            <span className="text-black font-mono font-bold text-4xl tracking-widest">
              {plate}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full">
          <div className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg p-3 font-mono text-lg text-emerald-400 text-center">
            {plate}
          </div>
          <CopyButton text={plate} />
          <button
            onClick={handleGenerate}
            className="p-2 rounded-md hover:bg-slate-700 text-slate-300 transition-colors"
            title="Gerar Novo"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
