import { 
  FileText, 
  CheckCircle, 
  MapPin, 
  CreditCard, 
  Code,
  Share2,
  Gamepad2,
  Type,
  GraduationCap,
  ShoppingCart,
  HeartPulse,
  Radio,
  Briefcase,
  Clock,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const navItems = [
  { id: 'documentos', label: 'Documentos', icon: FileText },
  { id: 'financas', label: 'Finanças e Negócios', icon: CreditCard },
  { id: 'saude', label: 'Saúde e Clínico', icon: HeartPulse },
  { id: 'ecommerce', label: 'E-commerce e Varejo', icon: ShoppingCart },
  { id: 'localizacao', label: 'Localização e Veículos', icon: MapPin },
  { id: 'iot', label: 'IoT e Logística', icon: Radio },
  { id: 'rh', label: 'Recursos Humanos', icon: Briefcase },
  { id: 'tecnologia', label: 'Tecnologia', icon: Code },
  { id: 'redes', label: 'Redes Sociais', icon: Share2 },
  { id: 'jogos', label: 'Jogos e Lazer', icon: Gamepad2 },
  { id: 'texto', label: 'Texto e Conteúdo', icon: Type },
  { id: 'educacao', label: 'Educação', icon: GraduationCap },
  { id: 'validadores', label: 'Validadores (Em Breve)', icon: CheckCircle },
];

export default function Sidebar({ activeTab, setActiveTab, onOpenHistory }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="w-64 glass-panel border-r border-slate-700/50 dark:border-slate-700 flex flex-col h-full hidden md:flex">
        <div className="flex items-center justify-center h-20 border-b border-white/10 relative">
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2 font-satoshi lowercase">
            <span className="text-emerald-400">simu</span>lae
          </h1>
          {/* Subtle glow behind logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-10 bg-emerald-500/20 blur-xl rounded-full"></div>
        </div>
      
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium font-satoshi ${
                isActive 
                  ? 'bg-emerald-500/10 text-emerald-400 shadow-[inset_2px_0_0_0_#34d399]' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>
      
      {/* Bottom Actions */}
      <div className="p-4 border-t border-white/10 dark:border-slate-800 flex flex-col gap-2">
        <button
          onClick={onOpenHistory}
          className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-sm font-medium transition-all text-slate-600 hover:text-emerald-500 hover:bg-emerald-50 dark:text-slate-400 dark:hover:text-emerald-400 dark:hover:bg-emerald-500/10"
        >
          <Clock size={18} />
          Histórico Local
        </button>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-sm font-medium transition-all text-slate-600 hover:text-emerald-500 hover:bg-emerald-50 dark:text-slate-400 dark:hover:text-emerald-400 dark:hover:bg-emerald-500/10"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
        </button>
        <div className="text-xs text-slate-400 dark:text-slate-500 text-center pt-2">
          Os dados gerados são fictícios e destinados a testes.
        </div>
      </div>
    </aside>
  );
}
