const dictionary = {
  states: ['SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'PE', 'CE', 'GO'],
  cities: [
    'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Porto Alegre', 
    'Curitiba', 'Florianópolis', 'Salvador', 'Recife', 'Fortaleza', 'Goiânia',
    'Campinas', 'Uberlândia', 'Ribeirão Preto', 'Caxias do Sul', 'Joinville'
  ],
  neighborhoods: [
    'Centro', 'Jardim Botânico', 'Copacabana', 'Savassi', 'Bela Vista',
    'Pinheiros', 'Moema', 'Leblon', 'Boa Viagem', 'Meireles',
    'Vila Madalena', 'Ipanema', 'Moinhos de Vento', 'Batel', 'Trindade'
  ],
  streets: [
    'Avenida Paulista', 'Avenida Nossa Senhora de Copacabana', 'Rua da Bahia',
    'Avenida Ipiranga', 'Rua XV de Novembro', 'Avenida Beira Mar',
    'Avenida Afonso Pena', 'Rua Oscar Freire', 'Avenida Borges de Medeiros',
    'Rua Augusta', 'Rua das Flores', 'Avenida Atlântica', 'Rua Domingos de Morais'
  ]
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function generateCEP(format = true) {
  const cep = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('');
  if (format) {
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
  }
  return cep;
}

export function generateAddress(desiredState = null) {
  const street = getRandom(dictionary.streets);
  const number = Math.floor(Math.random() * 2000) + 1;
  const neighborhood = getRandom(dictionary.neighborhoods);
  const city = getRandom(dictionary.cities);
  const state = desiredState || getRandom(dictionary.states);
  const cep = generateCEP();

  return `${street}, ${number}\n${neighborhood}\n${city} - ${state}\nCEP: ${cep}`;
}

export function generateTrackingCode() {
  const prefix = 'BR'; // Example postal prefix
  const numbers = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('');
  const suffix = 'BR';
  return `${prefix}${numbers}${suffix}`;
}

export function generateShippingLabel() {
  const senderName = 'Empresa Fictícia S.A.';
  const senderAddress = generateAddress();
  
  const names = ['João Silva', 'Maria Santos', 'Carlos Oliveira', 'Ana Costa', 'Pedro Souza'];
  const receiverName = getRandom(names);
  const receiverAddress = generateAddress();

  return `REMETENTE:\n${senderName}\n${senderAddress}\n\nDESTINATÁRIO:\n${receiverName}\n${receiverAddress}`;
}
