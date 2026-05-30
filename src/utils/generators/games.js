const dic = {
  roles: ['Guerreiro', 'Mago', 'Arqueiro', 'Paladino', 'Assassino', 'Bardo'],
  races: ['Humano', 'Elfo', 'Anão', 'Orc', 'Draconato', 'Tiefling'],
  adjectives: ['Sombrio', 'Luminoso', 'Caído', 'Ascendente', 'Feroz', 'Místico'],
  nouns: ['Lâminas', 'Dragões', 'Corvos', 'Lobos', 'Sombras', 'Guardiões'],
  bandAdjectives: ['The Rolling', 'The Black', 'Iron', 'Arctic', 'Pink', 'Red Hot'],
  bandNouns: ['Stones', 'Keys', 'Maiden', 'Monkeys', 'Floyd', 'Chili Peppers']
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function generateRPGCharacter() {
  const name = `Thorin ${getRandom(dic.adjectives)}`;
  const role = getRandom(dic.roles);
  const race = getRandom(dic.races);
  const hp = Math.floor(Math.random() * 50) + 50;
  const mp = Math.floor(Math.random() * 50) + 20;
  return `Nome: ${name}\nClasse: ${role}\nRaça: ${race}\nHP: ${hp} | MP: ${mp}\nAtributos: FOR:14 DES:16 INT:10`;
}

export function generateGuildName() {
  return `${getRandom(dic.nouns)} ${getRandom(dic.adjectives)}s`;
}

export function generateClanName() {
  return `[${getRandom(dic.nouns).substring(0,3).toUpperCase()}] ${getRandom(dic.nouns)}`;
}

export function generateBandName() {
  return `${getRandom(dic.bandAdjectives)} ${getRandom(dic.bandNouns)}`;
}

export function generateMovieTitle() {
  return `O Retorno dos ${getRandom(dic.nouns)}`;
}

export function generateFIFA() {
  const pos = getRandom(['ATA', 'MEI', 'VOL', 'ZAG', 'GOL']);
  const overall = Math.floor(Math.random() * 20) + 75;
  const pot = overall + Math.floor(Math.random() * 10);
  return `Jogador da Base\nPosição: ${pos}\nOverall Atual: ${overall}\nPotencial: ${pot}\nPerna Ruim: ⭐⭐⭐\nDribles: ⭐⭐⭐⭐`;
}

export function generateLottery() {
  const nums = new Set();
  while(nums.size < 6) {
    nums.add(Math.floor(Math.random() * 60) + 1);
  }
  return Array.from(nums).sort((a,b)=>a-b).map(n => n.toString().padStart(2, '0')).join(' - ');
}

export function generateBingo() {
  const colB = Array.from({length: 5}, () => Math.floor(Math.random() * 15) + 1);
  const colI = Array.from({length: 5}, () => Math.floor(Math.random() * 15) + 16);
  return `B: ${colB.join(', ')}\nI: ${colI.join(', ')}\nN: ---\nG: ---\nO: ---`;
}

export function generateJoke() {
  const jokes = [
    "O que o pato disse para a pata? Vem Quá!",
    "Qual o lado esquerdo do bolo? O lado que não foi comido!",
    "Por que o computador foi ao médico? Porque estava com vírus!"
  ];
  return getRandom(jokes);
}

export function generateTruthOrDare() {
  const trues = ["Qual seu maior medo?", "Qual sua comida favorita?", "Se pudesse viajar, pra onde iria?"];
  const dares = ["Dance por 1 minuto", "Mande mensagem para a primeira pessoa da sua lista", "Cante uma música alta"];
  return Math.random() > 0.5 ? `Verdade: ${getRandom(trues)}` : `Desafio: ${getRandom(dares)}`;
}
