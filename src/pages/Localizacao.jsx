import { useState } from 'react';
import CardGenerator from '../components/CardGenerator';
import CardGeneratorMulti from '../components/CardGeneratorMulti';
import PlacaVisual from '../components/PlacaVisual';

// ... (omitted)

import { 
  generateCEP, 
  generateAddress, 
  generateTrackingCode, 
  generateShippingLabel 
} from '../utils/generators/location';

import { 
  generateLicensePlate, 
  generateMotoPlate, 
  generateRENAVAM, 
  generateVIN 
} from '../utils/generators/vehicles';

export default function Localizacao() {
  const [selectedState, setSelectedState] = useState('');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100">Localização e Veículos</h2>
        <p className="text-slate-400 mt-2">
          Gere endereços brasileiros reais (offline), códigos postais, placas veiculares e dados de frota.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-emerald-400 border-b border-slate-700/50 pb-2 mb-4">Endereçamento & Logística</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardGenerator 
            title="CEP" 
            description="Código de Endereçamento Postal" 
            generatorFn={() => generateCEP(true)} 
          />
          <CardGeneratorMulti allowPdf={true} 
            title="Endereço Completo" 
            description="Logradouro real do Brasil" 
            generatorFn={() => generateAddress(selectedState || null)} 
          >
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full mt-2 bg-slate-900/50 border border-slate-700 rounded-md p-2 text-sm text-slate-200 outline-none focus:border-emerald-500 transition-colors"
            >
              <option value="">Qualquer Estado (Aleatório)</option>
              {['SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'PE', 'CE', 'GO'].map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </CardGeneratorMulti>
          <CardGenerator 
            title="Código de Rastreio" 
            description="Padrão Correios" 
            generatorFn={() => generateTrackingCode()} 
          />
          <CardGeneratorMulti allowPdf={true} 
            title="Etiqueta de Envio" 
            description="Remetente e Destinatário" 
            generatorFn={() => generateShippingLabel()} 
          />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-emerald-400 border-b border-slate-700/50 pb-2 mb-4">Veículos & Frota</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PlacaVisual generatorFn={() => generateLicensePlate(true)} />
          <CardGenerator 
            title="Placa Antiga" 
            description="Formato ABC-1234" 
            generatorFn={() => generateLicensePlate(false)} 
          />
          <CardGenerator 
            title="Placa de Moto" 
            description="Formato Mercosul" 
            generatorFn={() => generateMotoPlate(true)} 
          />
          <CardGenerator 
            title="RENAVAM" 
            description="Registro Nacional (11 dígitos)" 
            generatorFn={() => generateRENAVAM()} 
          />
          <CardGenerator 
            title="Chassi (VIN)" 
            description="Formato internacional ISO 3779" 
            generatorFn={() => generateVIN()} 
          />
        </div>
      </div>

    </div>
  );
}
