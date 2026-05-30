import CardGenerator from '../components/CardGenerator';
import { generateCPF } from '../utils/generators/cpf';
import { generateCNPJ } from '../utils/generators/cnpj';
import { generateRG } from '../utils/generators/rg';
import { generateCNH } from '../utils/generators/cnh';
import { generatePIS } from '../utils/generators/pis';

export default function Documentos() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100">Documentos Brasileiros</h2>
        <p className="text-slate-400 mt-2">
          Gere números válidos de documentos nacionais. Os dados gerados seguem as lógicas oficiais (como o Módulo 11) mas são fictícios.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-emerald-400 border-b border-slate-700/50 pb-2 mb-4">Essenciais</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardGenerator 
            title="CPF" 
            description="Cadastro de Pessoas Físicas (com formatação)" 
            generatorFn={() => generateCPF(true)} 
            allowBulk={true}
          />
          <CardGenerator 
            title="CNPJ" 
            description="Cadastro Nacional da Pessoa Jurídica" 
            generatorFn={() => generateCNPJ(true)} 
            allowBulk={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardGenerator 
          title="RG" 
          description="Registro Geral" 
          generatorFn={() => generateRG(true)} 
        />
        <CardGenerator 
          title="CNH" 
          description="Carteira Nacional de Habilitação" 
          generatorFn={() => generateCNH()} 
        />
        <CardGenerator 
          title="PIS/PASEP" 
          description="Programa de Integração Social" 
          generatorFn={() => generatePIS(true)} 
        />
      </div>
    </div>
  );
}
