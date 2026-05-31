import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function CopyButton({ text, label }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Copiado para a área de transferência!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Falha ao copiar');
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={handleCopy}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-300 ${
        copied 
          ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
          : 'bg-slate-200/50 dark:bg-white/5 hover:bg-slate-300/50 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300'
      }`}
      title="Copiar (Ctrl+C no hover)"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {label && <span className="text-sm font-medium">{copied ? 'Copiado' : label}</span>}
    </motion.button>
  );
}
