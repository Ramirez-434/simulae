import { useState } from 'react';
import { validateCPF } from '../utils/generators/cpf';
import { validateCNPJ } from '../utils/generators/cnpj';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function Validadores() {
  const [cpfInput, setCpfInput] = useState('');
  const [cpfStatus, setCpfStatus] = useState(null); // null, true, false

  const [cnpjInput, setCnpjInput] = useState('');
  const [cnpjStatus, setCnpjStatus] = useState(null);

  const handleValidateCpf = (val) => {
    setCpfInput(val);
    if (val.replace(/[^\d]/g, '').length >= 11) {
      setCpfStatus(validateCPF(val));
    } else {
      setCpfStatus(null);
    }
  };

  const handleValidateCnpj = (val) => {
    setCnpjInput(val);
    if (val.replace(/[^\d]/g, '').length >= 14) {
      setCnpjStatus(validateCNPJ(val));
    } else {
      setCnpjStatus(null);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100">Validadores</h2>
        <p className="text-slate-400 mt-2">
          Verifique a integridade algorítmica de documentos oficiais brasileiros. 100% Stateless.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CPF Validator */}
        <div className="glass-panel p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Validar CPF</h3>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Digite o CPF..." 
              value={cpfInput}
              onChange={(e) => handleValidateCpf(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-slate-200 outline-none focus:border-emerald-500 transition-colors pr-12"
            />
            {cpfStatus === true && <CheckCircle2 className="absolute right-3 top-3 text-emerald-400" />}
            {cpfStatus === false && <XCircle className="absolute right-3 top-3 text-red-400" />}
          </div>
          <p className="text-sm mt-3">
            Status: {cpfStatus === null ? <span className="text-slate-400">Aguardando...</span> : 
                     cpfStatus ? <span className="text-emerald-400 font-medium">CPF Válido</span> : 
                     <span className="text-red-400 font-medium">CPF Inválido</span>}
          </p>
        </div>

        {/* CNPJ Validator */}
        <div className="glass-panel p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Validar CNPJ</h3>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Digite o CNPJ..." 
              value={cnpjInput}
              onChange={(e) => handleValidateCnpj(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-slate-200 outline-none focus:border-emerald-500 transition-colors pr-12"
            />
            {cnpjStatus === true && <CheckCircle2 className="absolute right-3 top-3 text-emerald-400" />}
            {cnpjStatus === false && <XCircle className="absolute right-3 top-3 text-red-400" />}
          </div>
          <p className="text-sm mt-3">
            Status: {cnpjStatus === null ? <span className="text-slate-400">Aguardando...</span> : 
                     cnpjStatus ? <span className="text-emerald-400 font-medium">CNPJ Válido</span> : 
                     <span className="text-red-400 font-medium">CNPJ Inválido</span>}
          </p>
        </div>

      </div>
    </div>
  );
}
