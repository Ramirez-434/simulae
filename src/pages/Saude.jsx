import CardGenerator from '../components/CardGenerator';
import CardGeneratorMulti from '../components/CardGeneratorMulti';

import {
  generateCartaoSUS,
  generateBloodType,
  generateVitals,
  generateCID
} from '../utils/generators/health';

export default function Saude() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100 font-satoshi">Saúde e Clínico</h2>
        <p className="text-slate-400 mt-2">
          Geração de identificadores médicos, biometria e códigos internacionais para HealthTechs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <CardGenerator 
          title="Cartão do SUS" 
          description="Número Nacional de Saúde (15 dígitos)" 
          generatorFn={generateCartaoSUS} 
          allowBulk={true}
        />
        <CardGenerator 
          title="Tipo Sanguíneo" 
          description="Grupo e fator Rh" 
          generatorFn={generateBloodType} 
          allowBulk={true}
        />
        <CardGenerator 
          title="Código CID-10" 
          description="Classificação Internacional de Doenças" 
          generatorFn={generateCID} 
          allowBulk={true}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <CardGeneratorMulti allowPdf={true} 
          title="Sinais Vitais e Biometria (JSON)" 
          description="Dados randômicos de saúde de um paciente" 
          generatorFn={generateVitals} 
          allowBulk={true}
        />
      </div>
    </div>
  );
}
