import { useState, useEffect, useRef } from 'react';
import { Search, Command, FileText, Code, HeartPulse, ShoppingCart, Radio, Briefcase, MapPin, CreditCard, Share2, Gamepad2, Type, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const searchItems = [
  { id: 'cpf', title: 'Gerar CPF', category: 'Documentos', tab: 'documentos', icon: FileText },
  { id: 'cnpj', title: 'Gerar CNPJ', category: 'Documentos', tab: 'documentos', icon: FileText },
  { id: 'uuid', title: 'UUID v4', category: 'Tecnologia', tab: 'tecnologia', icon: Code },
  { id: 'json', title: 'Payload JSON', category: 'Tecnologia', tab: 'tecnologia', icon: Code },
  { id: 'sql', title: 'Query SQL', category: 'Tecnologia', tab: 'tecnologia', icon: Code },
  { id: 'sus', title: 'Cartão do SUS', category: 'Saúde', tab: 'saude', icon: HeartPulse },
  { id: 'cid', title: 'Código CID', category: 'Saúde', tab: 'saude', icon: HeartPulse },
  { id: 'sku', title: 'SKU de Produto', category: 'E-commerce', tab: 'ecommerce', icon: ShoppingCart },
  { id: 'ean', title: 'Código de Barras (EAN)', category: 'E-commerce', tab: 'ecommerce', icon: ShoppingCart },
  { id: 'gps', title: 'Coordenadas GPS', category: 'IoT', tab: 'iot', icon: Radio },
  { id: 'rfid', title: 'Tag RFID', category: 'IoT', tab: 'iot', icon: Radio },
  { id: 'holerite', title: 'Holerite / Contracheque', category: 'RH', tab: 'rh', icon: Briefcase },
  { id: 'ponto', title: 'Espelho de Ponto', category: 'RH', tab: 'rh', icon: Briefcase },
  { id: 'cartao', title: 'Cartão de Crédito', category: 'Finanças', tab: 'financas', icon: CreditCard },
  { id: 'pix', title: 'Chave PIX', category: 'Finanças', tab: 'financas', icon: CreditCard },
  { id: 'cep', title: 'CEP e Endereço', category: 'Localização', tab: 'localizacao', icon: MapPin },
  { id: 'placa', title: 'Placa de Veículo', category: 'Localização', tab: 'localizacao', icon: MapPin },
  { id: 'whatsapp', title: 'Conversa WhatsApp', category: 'Redes Sociais', tab: 'redes', icon: Share2 },
  { id: 'lorem', title: 'Lorem Ipsum', category: 'Texto', tab: 'texto', icon: Type }
];

export default function CommandPalette({ setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearch('');
    }
  }, [isOpen]);

  const filteredItems = searchItems.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) || 
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (tab) => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-[15vh]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-slate-900 border border-slate-700 shadow-2xl rounded-xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center px-4 border-b border-slate-800">
                <Search className="text-slate-400 mr-3" size={20} />
                <input
                  ref={inputRef}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Pesquise por CPF, UUID, Cartão SUS..."
                  className="w-full bg-transparent py-4 text-slate-100 outline-none placeholder:text-slate-500 font-sans"
                />
                <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono bg-slate-800 px-2 py-1 rounded">
                  <span>ESC</span>
                </div>
              </div>
              
              <div className="max-h-80 overflow-y-auto p-2">
                {filteredItems.length === 0 ? (
                  <div className="py-10 text-center text-slate-500 text-sm">
                    Nenhum gerador encontrado para "{search}"
                  </div>
                ) : (
                  filteredItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item.tab)}
                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-emerald-500/10 hover:text-emerald-400 group transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={18} className="text-slate-400 group-hover:text-emerald-400 transition-colors" />
                          <span className="text-slate-200 group-hover:text-emerald-400 font-medium">{item.title}</span>
                        </div>
                        <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded group-hover:bg-emerald-500/20 group-hover:text-emerald-400">{item.category}</span>
                      </button>
                    )
                  })
                )}
              </div>
              <div className="bg-slate-950 p-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1"><Command size={12}/> ou Ctrl + K para abrir</span>
                </div>
                <span>Gerador Brasil Smart Search</span>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
