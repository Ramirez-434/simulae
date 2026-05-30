const dic = {
  leroLero: [
    "A sinergia das equipes estimula a padronização das diretrizes de desenvolvimento.",
    "O dinamismo do mercado atual nos obriga à análise do levantamento das variáveis envolvidas.",
    "A complexidade dos estudos efetuados prepara-nos para enfrentar situações atípicas decorrentes da gestão de conhecimento.",
    "A certificação de metodologias que nos auxiliam a lidar com o aumento do diálogo acarreta um processo de reformulação das formas de ação."
  ],
  quotes: [
    "A persistência é o caminho do êxito.",
    "O sucesso é ir de fracasso em fracasso sem perder o entusiasmo.",
    "Não sabendo que era impossível, foi lá e fez."
  ],
  testimonials: [
    "Serviço excelente, superou todas as minhas expectativas!",
    "Muito bom! O atendimento foi rápido e o produto é de alta qualidade.",
    "Recomendo a todos de olhos fechados. Profissionalismo puro."
  ],
  slogans: [
    "A inovação a um clique de distância.",
    "Seu sucesso é a nossa maior meta.",
    "Pensando no amanhã, construindo hoje."
  ],
  news: [
    "Descubra as novas tecnologias que vão transformar o mercado de trabalho.",
    "Especialistas alertam: a mudança climática requer ações imediatas.",
    "Novo estudo revela os segredos para uma vida mais saudável e produtiva."
  ],
  essayTopics: [
    "Os impactos da inteligência artificial no mercado de trabalho.",
    "A importância da sustentabilidade nas grandes metrópoles.",
    "Desafios da educação a distância no Brasil pós-pandemia."
  ],
  podcasts: [
    "Devs do Futuro", "Papo Reto Tech", "Cast Empreendedor", "Inovação Sem Fronteiras"
  ]
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function generateLeroLero(size = 'Curto') {
  const count = size === 'Curto' ? 2 : size === 'Médio' ? 4 : 8;
  const text = [];
  for (let i = 0; i < count; i++) {
    text.push(getRandom(dic.leroLero));
  }
  return text.join(" ");
}

export function generateQuote() {
  return getRandom(dic.quotes);
}

export function generateTestimonial() {
  return getRandom(dic.testimonials);
}

export function generateSlogan() {
  return getRandom(dic.slogans);
}

export function generateFakeNews() {
  return `EXCLUSIVO: ${getRandom(dic.news)}`;
}

export function generateAdCopy() {
  return `Cansado de perder tempo? Descubra a solução definitiva para o seu problema. Clique no link e aproveite a nossa oferta por tempo limitado!\n\n👉 Saiba mais em: www.site.com/oferta`;
}

export function generateEmailMarketing() {
  return `Assunto: Oferta Especial Só Para Você!\n\nOlá [Nome],\n\nTemos uma surpresa incrível esperando por você. Confira os novos produtos da nossa loja com até 50% de desconto!\n\nAproveite já.\nAtenciosamente, Equipe Vendas.`;
}

export function generateEssayTopic() {
  return getRandom(dic.essayTopics);
}

export function generateABNT() {
  const names = ['SILVA, J.', 'SANTOS, M.', 'OLIVEIRA, C.'];
  const titles = ['O Estudo da Computação', 'A Sociedade Moderna', 'Metodologias Ágeis'];
  const years = ['2019', '2020', '2021', '2022', '2023'];
  return `${getRandom(names)} ${getRandom(titles)}. 2. ed. São Paulo: Editora Fictícia, ${getRandom(years)}. p. 45-60.`;
}

export function generatePodcastName() {
  return getRandom(dic.podcasts);
}

export function generateMenu() {
  return `ENTRADAS\n- Salada Tropical ... R$ 15,00\n- Fritas c/ Queijo ... R$ 22,00\n\nPRATO PRINCIPAL\n- Bife a Cavalo ... R$ 35,00\n- Parmegiana ... R$ 42,00\n\nSOBREMESA\n- Pudim ... R$ 12,00`;
}
