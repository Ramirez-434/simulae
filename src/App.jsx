import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Layout from './components/Layout';
import CommandPalette from './components/CommandPalette';
import HistoryPanel from './components/HistoryPanel';
import { HistoryProvider } from './context/HistoryContext';
import { useTheme } from './hooks/useTheme';
import Documentos from './pages/Documentos';

// ... (omitting lines, let's just do a smaller replace instead)
import Validadores from './pages/Validadores';
import Localizacao from './pages/Localizacao';
import Financas from './pages/Financas';
import Tecnologia from './pages/Tecnologia';
import RedesSociais from './pages/RedesSociais';
import Jogos from './pages/Jogos';
import Texto from './pages/Texto';
import Educacao from './pages/Educacao';
import Ecommerce from './pages/Ecommerce';
import Saude from './pages/Saude';
import IoT from './pages/IoT';
import RH from './pages/RH';

function App() {
  const [activeTab, setActiveTab] = useState('documentos');
  const { theme } = useTheme();
  
  // Mouse tracking for reactive background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate mouse position relative to window dimensions (from -50 to 50)
      const x = (e.clientX / window.innerWidth - 0.5) * 100;
      const y = (e.clientY / window.innerHeight - 0.5) * 100;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const renderContent = () => {
    switch (activeTab) {
      case 'documentos': return <Documentos />;
      case 'validadores': return <Validadores />;
      case 'localizacao': return <Localizacao />;
      case 'financas': return <Financas />;
      case 'tecnologia': return <Tecnologia />;
      case 'redes': return <RedesSociais />;
      case 'jogos': return <Jogos />;
      case 'texto': return <Texto />;
      case 'educacao': return <Educacao />;
      case 'ecommerce': return <Ecommerce />;
      case 'saude': return <Saude />;
      case 'iot': return <IoT />;
      case 'rh': return <RH />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <p className="text-xl">Módulo em desenvolvimento...</p>
          </div>
        );
    }
  };

  return (
    <HistoryProvider>
      <div className={`relative min-h-screen bg-slate-50 text-slate-800 dark:bg-[#050505] dark:text-slate-200 overflow-hidden font-sans z-0`}>
        <Toaster theme={theme === 'dark' ? 'dark' : 'light'} position="bottom-center" toastOptions={{
          className: 'glass-panel !bg-white/90 dark:!bg-slate-900/90 !text-slate-800 dark:!text-slate-100 !border-slate-200 dark:!border-white/10'
        }} />
        <CommandPalette setActiveTab={setActiveTab} />
        <HistoryPanel isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
      
      {/* --- INÍCIO DO MESH GRADIENT INTERATIVO --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        {/* Blob Azul Escuro (Reativo) */}
        <motion.div 
          className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-300/60 dark:bg-blue-900/40 mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-70"
          style={{ x: springX, y: springY }}
        />
        {/* Blob Roxo (Menos reativo, inverso) */}
        <motion.div 
          className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-purple-300/60 dark:bg-purple-900/30 mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-70"
          style={{ x: useSpring(useMotionValue(0), { stiffness: 20 }), y: useSpring(useMotionValue(0), { stiffness: 20 }) }}
        />
        {/* Blob Esmeralda/Teal (Fixo) */}
        <div className="absolute bottom-[-20%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-teal-300/50 dark:bg-teal-900/20 mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-60"></div>
      </div>
      {/* --- FIM DO MESH GRADIENT --- */}

        <div className="relative z-10 h-screen">
          <Layout activeTab={activeTab} setActiveTab={setActiveTab} onOpenHistory={() => setIsHistoryOpen(true)}>
            {renderContent()}
          </Layout>
        </div>
      </div>
    </HistoryProvider>
  );
}

export default App;
