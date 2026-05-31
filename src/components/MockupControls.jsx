import { useChatSimulation } from '../context/ChatSimulationContext';

export default function MockupControls() {
  const { contactName, setContactName, addMessage } = useChatSimulation();

  return (
    <div className="bg-slate-900/30 p-4 rounded-xl flex flex-col gap-3 border border-slate-700/50 mt-4 mb-2">
      <h4 className="font-semibold text-slate-300 text-sm">Controles de Simulação</h4>
      
      <div className="flex flex-col gap-1">
        <label className="text-[11px] text-slate-400 uppercase tracking-wide">Nome do Contato</label>
        <input 
          type="text" 
          value={contactName} 
          onChange={(e) => setContactName(e.target.value)} 
          className="bg-slate-900/80 border border-slate-700 rounded px-2 py-1.5 text-sm text-slate-200 outline-none focus:border-emerald-500 transition-colors w-full"
        />
      </div>

      <button 
        onClick={addMessage}
        className="mt-1 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded py-1.5 text-sm transition-colors font-medium"
      >
        + Adicionar Balão
      </button>
    </div>
  );
}
