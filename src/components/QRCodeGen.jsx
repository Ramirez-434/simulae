import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { RefreshCw } from 'lucide-react';
import { generateUUID } from '../utils/generators/tech';

export default function QRCodeGen({ title, description }) {
  const [value, setValue] = useState(generateUUID());

  return (
    <div className="glass-panel p-6 rounded-xl flex flex-col gap-4 items-center text-center">
      <div className="w-full text-left">
        <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
        {description && <p className="text-sm text-slate-400 mt-1">{description}</p>}
      </div>

      <div className="p-4 bg-white rounded-xl shadow-inner mt-2">
        <QRCodeSVG value={value} size={128} level="M" />
      </div>

      <div className="flex items-center gap-2 mt-auto w-full">
        <input 
          type="text" 
          value={value} 
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-slate-200 outline-none focus:border-emerald-500 font-mono text-sm"
        />
        <button
          onClick={() => setValue(generateUUID())}
          className="p-2 rounded-md hover:bg-slate-700 text-slate-300 transition-colors"
          title="Aleatório"
        >
          <RefreshCw size={18} />
        </button>
      </div>
    </div>
  );
}
