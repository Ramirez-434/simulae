import jsPDF from 'jspdf';
import { toast } from 'sonner';

export async function exportToPDF(title, content) {
  try {
    const doc = new jsPDF();
    const margin = 15;
    
    // Título
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin, margin + 10);
    
    // Conteúdo
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    // O splitTextToSize quebra o texto nas margens (210mm de largura A4 - 30mm margens)
    const lines = doc.splitTextToSize(content, 210 - (margin * 2));
    
    doc.text(lines, margin, margin + 20);
    
    const filename = `${title.toLowerCase().replace(/[^a-z0-9]/gi, '_')}.pdf`;
    doc.save(filename);
    
    toast.success(`PDF gerado: ${filename}`);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    toast.error('Falha ao exportar PDF.');
  }
}
