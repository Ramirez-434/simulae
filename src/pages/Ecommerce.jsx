import CardGenerator from '../components/CardGenerator';
import CardGeneratorMulti from '../components/CardGeneratorMulti';
import BarcodeGen from '../components/BarcodeGen';

import {
  generateSKU,
  generateBarcodeEAN,
  generateMockProduct,
  generateReview
} from '../utils/generators/ecommerce';

export default function Ecommerce() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100 font-satoshi">E-commerce e Varejo</h2>
        <p className="text-slate-400 mt-2">
          Geração de SKUs, códigos de barras (EAN-13), produtos mockados e avaliações de clientes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <CardGenerator 
          title="SKU de Produto" 
          description="Código de controle de estoque" 
          generatorFn={generateSKU} 
          allowBulk={true}
        />
        <BarcodeGen 
          title="Código de Barras (EAN-13)" 
          description="Padrão comercial com dígito validador" 
          generatorFn={generateBarcodeEAN} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardGeneratorMulti 
          title="Produto Mockado (JSON)" 
          description="Atributos completos de e-commerce" 
          generatorFn={generateMockProduct} 
          allowBulk={true}
        />
        <CardGeneratorMulti 
          title="Avaliação de Cliente" 
          description="Review com estrelas e data" 
          generatorFn={generateReview} 
          allowBulk={true}
        />
      </div>
    </div>
  );
}
