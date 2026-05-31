import { useChatSimulation } from '../context/ChatSimulationContext';

export default function MockupControls() {
  const { 
    contactName, setContactName, 
    addMessage,
    showHeader, setShowHeader,
    showFooter, setShowFooter,
    showStatusBar, setShowStatusBar,
    contactStatus, setContactStatus,
    osType, setOsType
  } = useChatSimulation();

  return (
    <div className="bg-slate-900/30 p-4 rounded-xl flex flex-col gap-3 border border-slate-700/50 mt-4 mb-2">
      <h4 className="font-semibold text-slate-300 text-sm">Controles de Simulação (Fase 2)</h4>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-slate-400 uppercase tracking-wide">Nome do Contato</label>
          <input 
            type="text" 
            value={contactName} 
            onChange={(e) => setContactName(e.target.value)} 
            className="bg-slate-900/80 border border-slate-700 rounded px-2 py-1.5 text-sm text-slate-200 outline-none focus:border-emerald-500 transition-colors w-full"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-slate-400 uppercase tracking-wide">Status / Visto por Último</label>
          <input 
            type="text" 
            value={contactStatus} 
            onChange={(e) => setContactStatus(e.target.value)} 
            className="bg-slate-900/80 border border-slate-700 rounded px-2 py-1.5 text-sm text-slate-200 outline-none focus:border-emerald-500 transition-colors w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-700/50">
        <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 hover:text-emerald-400 transition-colors">
          <input type="checkbox" checked={showStatusBar} onChange={(e) => setShowStatusBar(e.target.checked)} className="accent-emerald-500" />
          Status Bar (OS)
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 hover:text-emerald-400 transition-colors">
          <input type="checkbox" checked={showHeader} onChange={(e) => setShowHeader(e.target.checked)} className="accent-emerald-500" />
          Cabeçalho
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300 hover:text-emerald-400 transition-colors">
          <input type="checkbox" checked={showFooter} onChange={(e) => setShowFooter(e.target.checked)} className="accent-emerald-500" />
          Teclado (Input)
        </label>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">OS:</span>
          <select value={osType} onChange={(e) => setOsType(e.target.value)} className="bg-slate-800 border border-slate-600 rounded text-slate-200 px-1 py-0.5 outline-none">
            <option value="ios">iOS</option>
            <option value="android">Android</option>
          </select>
        </div>
      </div>

      <button 
        onClick={addMessage}
        className="mt-1 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded py-1.5 text-sm transition-colors font-medium w-full"
      >
        + Adicionar Balão
      </button>
    </div>
  );
}
