const dictionary = {
  companyNames: [
    'Tech Brasil Soluções', 'Inovação Digital Ltda', 'Comercial Silva & Cia', 
    'Logística Express S.A.', 'Consultoria Estratégica ME', 'Construtora Horizonte', 
    'Alimentos Premium', 'Serviços Globais EIRELI'
  ],
  products: ['Notebook', 'Cadeira de Escritório', 'Smartphone', 'Monitor 27"', 'Mesa Digitalizadora']
};

export function generateCorporateName() {
  return dictionary.companyNames[Math.floor(Math.random() * dictionary.companyNames.length)];
}

export function generateCNAE() {
  // Format: 0000-0/00
  const n = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('');
  return `${n.slice(0,4)}-${n.slice(4,5)}/${n.slice(5)}`;
}

export function generateIE() {
  // Inscrição Estadual usually has 9-14 digits depending on state
  const ie = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join('');
  return `${ie.slice(0,3)}.${ie.slice(3,6)}.${ie.slice(6,9)}.${ie.slice(9)}`;
}

export function generateNFe() {
  const chaveAcesso = Array.from({ length: 44 }, () => Math.floor(Math.random() * 10)).join('');
  const protocolo = `1${Array.from({ length: 14 }, () => Math.floor(Math.random() * 10)).join('')}`;
  const total = (Math.random() * 5000 + 100).toFixed(2);
  const emitente = generateCorporateName();
  const produto = dictionary.products[Math.floor(Math.random() * dictionary.products.length)];

  return `NF-e Simulação
------------------------------
Chave de Acesso:
${chaveAcesso.replace(/(\d{4})/g, '$1 ')}
Protocolo: ${protocolo}
Emitente: ${emitente}
------------------------------
Item 1: ${produto}
Valor Total: R$ ${total}`;
}
