import CardGenerator from '../components/CardGenerator';
import CardGeneratorMulti from '../components/CardGeneratorMulti';
import ColorPalette from '../components/ColorPalette';
import QRCodeGen from '../components/QRCodeGen';
import BarcodeGen from '../components/BarcodeGen';

import {
  generateUUID,
  generatePassword,
  generateApiKey,
  generateJWT,
  generateHash,
  generateIPv4,
  generateIPv6,
  generateMacAddress,
  generateUserAgent,
  generateEmail,
  generatePhone,
  generateJSON,
  generateSQLInsert,
  generateLoremIpsum,
  generateRegex,
  generateRandomNumber
} from '../utils/generators/tech';

export default function Tecnologia() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100 font-satoshi">Tecnologia e Desenvolvimento</h2>
        <p className="text-slate-400 mt-2">
          Geração de identificadores, payloads de segurança, mockups de dados estruturados e ferramentas visuais genéricas.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-emerald-400 border-b border-slate-700/50 pb-2 mb-4">Segurança e Identificadores</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardGenerator 
            title="Senha Forte" 
            description="16 caracteres alfanuméricos + símbolos" 
            generatorFn={() => generatePassword(16)} 
            allowBulk={true}
          />
          <CardGenerator 
            title="UUID v4" 
            description="Identificador Universal" 
            generatorFn={() => generateUUID()} 
            allowBulk={true}
          />
          <CardGenerator 
            title="API Key" 
            description="Chave de mock" 
            generatorFn={() => generateApiKey()} 
            allowBulk={true}
          />
          <CardGenerator 
            title="Hash SHA-256" 
            description="Baseado na Web Crypto API" 
            generatorFn={() => generateHash()} 
          />
          <CardGeneratorMulti allowPdf={true} 
            title="Token JWT" 
            description="Mock base64 encodado" 
            generatorFn={() => generateJWT()} 
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-emerald-400 border-b border-slate-700/50 pb-2 mb-4">Redes e Contatos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardGenerator 
            title="Endereço IPv4" 
            description="IP formato padrão" 
            generatorFn={() => generateIPv4()} 
          />
          <CardGenerator 
            title="Endereço IPv6" 
            description="IP formato expandido" 
            generatorFn={() => generateIPv6()} 
          />
          <CardGenerator 
            title="MAC Address" 
            description="Endereço Físico" 
            generatorFn={() => generateMacAddress()} 
          />
          <CardGenerator 
            title="E-mail" 
            description="Caixa postal simulada" 
            generatorFn={() => generateEmail()} 
          />
          <CardGenerator 
            title="Telefone" 
            description="Celular Padrão BR" 
            generatorFn={() => generatePhone()} 
          />
          <CardGeneratorMulti allowPdf={true} 
            title="User Agent" 
            description="Header HTTP de navegadores" 
            generatorFn={() => generateUserAgent()} 
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-emerald-400 border-b border-slate-700/50 pb-2 mb-4">Dados em Bloco</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardGeneratorMulti allowPdf={true} 
            title="Payload JSON" 
            description="Objeto aninhado de teste" 
            generatorFn={() => generateJSON()} 
          />
          <CardGeneratorMulti allowPdf={true} 
            title="Query SQL INSERT" 
            description="Instrução de banco relacional" 
            generatorFn={() => generateSQLInsert()} 
          />
          <CardGeneratorMulti allowPdf={true} 
            title="Lorem Ipsum" 
            description="Parágrafo de marcação de texto" 
            generatorFn={() => generateLoremIpsum()} 
          />
          <div className="flex flex-col gap-6">
            <CardGenerator 
              title="Expressão Regular" 
              description="Exemplos comuns de Regex" 
              generatorFn={() => generateRegex()} 
            />
            <CardGenerator 
              title="Número Aleatório" 
              description="Até 1 milhão" 
              generatorFn={() => generateRandomNumber()} 
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-emerald-400 border-b border-slate-700/50 pb-2 mb-4">Mídia e Visuais</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ColorPalette 
            title="Paleta de Cores" 
            description="Hexadecimais aleatórios" 
          />
          <QRCodeGen 
            title="QR Code" 
            description="Gráfico interativo editável" 
          />
          <BarcodeGen 
            title="Código de Barras" 
            description="Padrão genérico CODE128" 
          />
        </div>
      </div>

    </div>
  );
}
