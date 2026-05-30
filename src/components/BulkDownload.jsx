import { useState } from 'react';
import { Download, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function BulkDownload({ title, generatorFn, quantity = 100 }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleBulkGenerate = async () => {
    setIsGenerating(true);
    
    // Simula um pequeno delay para a UI respirar e mostrar o loading
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const items = [];
    for (let i = 0; i < quantity; i++) {
      const val = generatorFn();
      items.push(val);
    }

    const isJson = typeof items[0] === 'string' && items[0].startsWith('{');
    let content = '';
    let type = 'text/plain';
    let ext = 'txt';

    if (isJson) {
      content = '[\n' + items.join(',\n') + '\n]';
      type = 'application/json';
      ext = 'json';
    } else {
      content = items.join('\n');
      type = 'text/csv';
      ext = 'csv';
    }

    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.toLowerCase().replace(/[^a-z0-9]/gi, '_')}_bulk_${quantity}.${ext}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setIsGenerating(false);
    setIsDone(true);
    toast.success(`${quantity} registros de ${title} exportados com sucesso!`);
    
    setTimeout(() => setIsDone(false), 3000);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={handleBulkGenerate}
      disabled={isGenerating}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-300 w-full sm:w-auto justify-center ${
        isDone 
          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
          : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-transparent hover:border-white/10'
      }`}
      title={`Baixar ${quantity} registros`}
    >
      {isGenerating ? (
        <Loader2 size={16} className="animate-spin" />
      ) : isDone ? (
        <Check size={16} />
      ) : (
        <Download size={16} />
      )}
      <span className="text-sm font-medium">
        {isGenerating ? 'Processando...' : isDone ? 'Baixado' : 'Massa (Bulk)'}
      </span>
    </motion.button>
  );
}
