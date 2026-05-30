import CardGenerator from '../components/CardGenerator';
import CardGeneratorMulti from '../components/CardGeneratorMulti';

import {
  generateCargo,
  generatePonto,
  generateHolerite
} from '../utils/generators/hr';

export default function RH() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100 font-satoshi">Recursos Humanos (RH)</h2>
        <p className="text-slate-400 mt-2">
          Geração de contracheques detalhados, registros de ponto e cargos corporativos.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <CardGenerator 
          title="Cargo & Departamento" 
          description="Nomenclaturas corporativas reais" 
          generatorFn={generateCargo} 
          allowBulk={true}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardGeneratorMulti 
          title="Espelho de Ponto (JSON)" 
          description="Batidas de entrada e saída com atrasos randômicos" 
          generatorFn={generatePonto} 
          allowBulk={true}
        />
        <CardGeneratorMulti 
          title="Holerite / Contracheque" 
          description="Cálculo fictício de INSS, IRRF e salário líquido" 
          generatorFn={generateHolerite} 
          allowBulk={true}
        />
      </div>
    </div>
  );
}
