const dic = {
  firstNames: ['Alex', 'Cris', 'Sam', 'Taylor', 'Jordan', 'Casey', 'Leo', 'Mia', 'Nico', 'Zoe'],
  adjectives: ['cool', 'pro', 'real', 'oficial', 'br', 'gamer', 'dev', 'ninja', 'star', 'tech'],
  nouns: ['vibes', 'life', 'style', 'code', 'art', 'music', 'gaming', 'travel', 'food', 'tips'],
  hashtags: ['#tbt', '#instagood', '#photooftheday', '#beautiful', '#happy', '#cute', '#picoftheday', '#follow', '#me', '#art']
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function generateNick() {
  const name = getRandom(dic.firstNames);
  const adj = getRandom(dic.adjectives);
  const num = Math.floor(Math.random() * 999);
  return `${name}_${adj}${num}`;
}

export function generateInstaName() {
  const name = getRandom(dic.firstNames);
  const adj = getRandom(dic.adjectives);
  return `${name} ${adj.charAt(0).toUpperCase() + adj.slice(1)}`;
}

export function generateInstaBio() {
  return `✨ Vivendo a ${getRandom(dic.nouns)}\n🚀 Focado em ser ${getRandom(dic.adjectives)}\n📍 Brasil\n👇 Link na bio!`;
}

export function generateYoutubeName() {
  return `${getRandom(dic.firstNames)} ${getRandom(dic.nouns).toUpperCase()}`;
}

export function generateYoutubeDesc() {
  return `Bem-vindo ao canal!\nAqui você encontra o melhor conteúdo sobre ${getRandom(dic.nouns)} e muito mais.\nVídeos novos toda semana! Inscreva-se e não perca as novidades.`;
}

export function generateHashtags() {
  const selected = [];
  for(let i=0; i<5; i++){
    selected.push(getRandom(dic.hashtags));
  }
  return selected.join(' ');
}

export function generateLinkedInPost() {
  return `Muito feliz em compartilhar que hoje inicio um novo ciclo na minha carreira como desenvolvedor(a)! 🚀\n\nAgradeço a todos que me apoiaram nesta jornada. O aprendizado continua!\n\n${generateHashtags()}`;
}

export function generateTweet() {
  return `Apenas pensando sobre como ${getRandom(dic.nouns)} muda a forma como vemos as coisas hoje em dia. Muito ${getRandom(dic.adjectives)}! 🤔✨`;
}

export function generateEmailSignature() {
  return `${generateInstaName()}\nEspecialista em ${getRandom(dic.nouns)}\n📱 (11) 99999-9999\n✉️ contato@email.com\n🌐 www.site.com`;
}

export function generateWhatsappLink() {
  const num = `55119${Math.floor(Math.random()*9000)+1000}${Math.floor(Math.random()*9000)+1000}`;
  return `https://wa.me/${num}?text=Ol%C3%A1%2C%20vim%20pelo%20site!`;
}

const whatsappDictionary = {
  saudacoes: [
    "Oi, tudo bem?",
    "Olá! Bom dia.",
    "Opa, boa tarde!",
    "E aí, como estão as coisas?",
    "Fala chefe, tranquilo?",
    "Oi! Passando pra dar um alô.",
    "Bom dia! Como podemos ajudar hoje?"
  ],
  perguntas: [
    "Consegue me enviar aquele relatório hoje?",
    "Que horas é a nossa reunião mesmo?",
    "Você viu a última mensagem no grupo?",
    "Pode me confirmar o endereço da entrega?",
    "Já teve algum retorno sobre aquele orçamento?",
    "Tem previsão de quando o sistema volta ao ar?",
    "Pode me dar uma atualização sobre o status do pedido?"
  ],
  respostas: [
    "Sim, já estou vendo isso.",
    "Ainda não, vou checar agora mesmo.",
    "Pode deixar, envio em 10 minutos.",
    "Tudo certo, confirmado!",
    "Não recebi nada ainda, pode reenviar?",
    "Acabei de verificar e está tudo nos conformes.",
    "Vou confirmar com a equipe e te aviso em breve."
  ],
  despedidas: [
    "Perfeito, obrigado!",
    "Qualquer dúvida, me avisa.",
    "Valeu, até mais!",
    "Ótimo, fico no aguardo.",
    "Abraço, bom trabalho!",
    "Tudo bem, a gente se fala mais tarde.",
    "Agradeço pela atenção!"
  ]
};

export function generateWhatsappChat() {
  let date = new Date();
  date.setHours(Math.floor(Math.random() * 8) + 8); // Entre 8h e 16h
  date.setMinutes(Math.floor(Math.random() * 60));
  
  const formatTime = (d) => d.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
  const addMinutes = (d, mins) => new Date(d.getTime() + mins * 60000);

  const t1 = formatTime(date);
  date = addMinutes(date, Math.floor(Math.random() * 3) + 1);
  const t2 = formatTime(date);
  date = addMinutes(date, Math.floor(Math.random() * 10) + 1);
  const t3 = formatTime(date);
  date = addMinutes(date, Math.floor(Math.random() * 5) + 1);
  const t4 = formatTime(date);

  const saudacao = getRandom(whatsappDictionary.saudacoes);
  const pergunta = getRandom(whatsappDictionary.perguntas);
  const resposta = getRandom(whatsappDictionary.respostas);
  const despedida = getRandom(whatsappDictionary.despedidas);

  return `[${t1}] Remetente: ${saudacao} ${pergunta}\n[${t2}] Você: ${resposta}\n[${t3}] Remetente: ${despedida}\n[${t4}] Você: Maravilha!`;
}
