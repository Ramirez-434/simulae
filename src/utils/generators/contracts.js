import { generateCorporateName } from './corporate';

export function generateReceipt() {
  const emitente = generateCorporateName();
  const valor = (Math.random() * 2000 + 50).toFixed(2).replace('.', ',');
  const date = new Date().toLocaleDateString('pt-BR');
  
  return `RECIBO DE PAGAMENTO

Recebi(emos) de NOME DO CLIENTE, a importância de R$ ${valor} referente aos serviços prestados/produtos adquiridos.

Para maior clareza, firmamos o presente recibo.

${emitente}
São Paulo, ${date}`;
}

export function generateRentalContract() {
  const locator = 'Imobiliária Brasil Ltda';
  const locatario = 'João da Silva';
  const address = 'Rua das Flores, 123 - Centro';
  const valor = (Math.random() * 3000 + 800).toFixed(2).replace('.', ',');
  
  return `CONTRATO DE LOCAÇÃO

LOCADOR: ${locator}
LOCATÁRIO: ${locatario}

OBJETO: O LOCADOR aluga ao LOCATÁRIO o imóvel situado na ${address}.
VALOR: O aluguel mensal será de R$ ${valor}, com vencimento todo dia 05.
PRAZO: 12 meses, a partir da data de assinatura.

Assinaturas:
__________________________ (Locador)
__________________________ (Locatário)`;
}
