import { Clock } from 'lucide-react';
import Sidebar from './Sidebar';

export default function Layout({ children, activeTab, setActiveTab, onOpenHistory }) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onOpenHistory={onOpenHistory} />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Background decorative elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
        
        <header className="md:hidden p-4 border-b border-white/10 glass-panel z-10 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center justify-center font-satoshi lowercase">
            <span className="text-emerald-400">simu</span>lae
          </h1>
          <button onClick={onOpenHistory} className="p-2 bg-slate-800 rounded-full text-slate-300">
            <Clock size={18} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 z-10">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
