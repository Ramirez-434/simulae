import { useState } from 'react';
import { FileText, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { exportToPDF } from '../utils/pdfExport';

export default function ExportPDFButton({ title, content }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    // Pequeno delay para a UI respirar e a animação aparecer
    await new Promise(resolve => setTimeout(resolve, 150));
    await exportToPDF(title, content);
    setIsExporting(false);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={handleExport}
      disabled={isExporting || !content}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-300 w-full sm:w-auto justify-center bg-slate-200/50 dark:bg-white/5 hover:bg-slate-300/50 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 border border-transparent hover:border-slate-300 dark:hover:border-white/10`}
      title="Baixar como PDF"
    >
      {isExporting ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <FileText size={16} />
      )}
      <span className="text-sm font-medium">
        PDF
      </span>
    </motion.button>
  );
}
