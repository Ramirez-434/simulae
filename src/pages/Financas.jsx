import { useState } from 'react';
import CardGenerator from '../components/CardGenerator';
import CardGeneratorMulti from '../components/CardGeneratorMulti';
import FilterSelect from '../components/FilterSelect';

import { 
  generateCreditCard, 
  generateIBAN, 
  generateBancaryAccount, 
  generateBoleto, 
  generatePIX 
} from '../utils/generators/finance';

import { 
  generateCorporateName, 
  generateCNAE, 
  generateIE, 
  generateNFe 
} from '../utils/generators/corporate';

import { 
  generateReceipt, 
  generateRentalContract 
} from '../utils/generators/contracts';

export default function Financas() {
  const [ccBrand, setCcBrand] = useState('visa');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100">Finanças e Negócios</h2>
        <p className="text-slate-400 mt-2">
          Geradores matematicamente válidos para e-commerces, gateways de pagamento e ERPs. 
          Processamento 100% no navegador (stateless).
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-emerald-400 border-b border-slate-700/50 pb-2 mb-4">Pagamentos e Bancos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardGenerator 
            title={`Cartão de Crédito (${ccBrand.toUpperCase()})`} 
            description="Algoritmo de Luhn Válido" 
            generatorFn={() => generateCreditCard(ccBrand)} 
          >
            <FilterSelect 
              value={ccBrand}
              onChange={setCcBrand}
              options={[
                { value: 'visa', label: 'Visa' },
                { value: 'mastercard', label: 'Mastercard' },
                { value: 'amex', label: 'American Express' }
              ]}
            />
          </CardGenerator>
          <CardGenerator 
            title="IBAN" 
            description="Módulo 97 Internacional" 
            generatorFn={() => generateIBAN()} 
          />
          <CardGenerator 
            title="Conta Bancária" 
            description="Agência e Conta c/ DV" 
            generatorFn={() => generateBancaryAccount()} 
          />
          <CardGeneratorMulti 
            title="Linha Digitável (Boleto)" 
            description="Módulos 10 e 11 combinados" 
            generatorFn={() => generateBoleto()} 
          />
          <CardGeneratorMulti 
            title="PIX Copia e Cola" 
            description="Payload EMV c/ CRC16" 
            generatorFn={() => generatePIX()} 
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-emerald-400 border-b border-slate-700/50 pb-2 mb-4">Corporativo & Fisco</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardGenerator 
            title="CNAE" 
            description="Classificação de Atividades" 
            generatorFn={() => generateCNAE()} 
          />
          <CardGenerator 
            title="Inscrição Estadual (IE)" 
            description="Simulação de IE" 
            generatorFn={() => generateIE()} 
          />
          <CardGenerator 
            title="Nome de Empresa" 
            description="Razão Social Fictícia" 
            generatorFn={() => generateCorporateName()} 
          />
          <CardGeneratorMulti 
            title="Nota Fiscal (NF-e)" 
            description="Simulação de Danfe/NFe" 
            generatorFn={() => generateNFe()} 
            allowPdf={true}
          />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-emerald-400 border-b border-slate-700/50 pb-2 mb-4">Contratos e Documentos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardGeneratorMulti 
            title="Recibo de Pagamento" 
            description="Modelo genérico" 
            generatorFn={() => generateReceipt()} 
            allowPdf={true}
          />
          <CardGeneratorMulti 
            title="Contrato de Locação" 
            description="Cláusulas simples" 
            generatorFn={() => generateRentalContract()} 
            allowPdf={true}
          />
        </div>
      </div>

    </div>
  );
}
