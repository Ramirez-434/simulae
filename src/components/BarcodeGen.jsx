import { useState } from 'react';
import Barcode from 'react-barcode';
import { RefreshCw } from 'lucide-react';
import { generateRandomNumber } from '../utils/generators/tech';

export default function BarcodeGen({ title, description }) {
  const [value, setValue] = useState(generateRandomNumber() + generateRandomNumber());

  return (
    <div className="glass-panel p-6 rounded-xl flex flex-col gap-4 items-center text-center">
      <div className="w-full text-left">
        <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
        {description && <p className="text-sm text-slate-400 mt-1">{description}</p>}
      </div>

      <div className="p-4 bg-white rounded-xl shadow-inner mt-2 w-full overflow-hidden flex justify-center">
        <Barcode value={value} format="CODE128" width={1.5} height={60} displayValue={false} background="#ffffff" lineColor="#000000" />
      </div>

      <div className="flex items-center gap-2 mt-auto w-full">
        <input 
          type="text" 
          value={value} 
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-slate-200 outline-none focus:border-emerald-500 font-mono text-sm"
        />
        <button
          onClick={() => setValue(generateRandomNumber() + generateRandomNumber())}
          className="p-2 rounded-md hover:bg-slate-700 text-slate-300 transition-colors"
          title="Aleatório"
        >
          <RefreshCw size={18} />
        </button>
      </div>
    </div>
  );
}
