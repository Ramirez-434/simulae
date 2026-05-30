const dic = {
  subjects: ['Matemática', 'Física', 'História', 'Geografia', 'Biologia', 'Química'],
  books: ['Dom Casmurro', 'Memórias Póstumas de Brás Cubas', 'O Cortiço', 'Capitães da Areia']
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function generateResume() {
  return `NOME: Estudante Fictício\nOBJETIVO: Vaga de Estágio\n\nFORMAÇÃO:\n- Ciência da Computação (Cursando)\n\nEXPERIÊNCIA:\n- Projeto Acadêmico de IA\n- Monitoria de Matemática\n\nHABILIDADES:\n- JavaScript, Python, React`;
}

export function generateDiploma() {
  return `CERTIFICADO DE CONCLUSÃO\n\nCertificamos que JOÃO DA SILVA concluiu o curso de graduação em CIÊNCIA DA COMPUTAÇÃO, com carga horária de 3000 horas, cumprindo todos os requisitos acadêmicos.\n\nData: ${new Date().toLocaleDateString('pt-BR')}`;
}

export function generateAcademicRecord() {
  return `HISTÓRICO ESCOLAR\nAluno: Maria Souza\nRA: 2023001\n\nDisciplinas:\n- Cálculo I: Aprovado (Nota 8.5)\n- Algoritmos: Aprovado (Nota 9.0)\n- Banco de Dados: Cursando\n\nMédia Geral: 8.75`;
}

export function generateStudySchedule() {
  return `CRONOGRAMA SEMANAL\nSeg: ${getRandom(dic.subjects)} (Teoria) + Exercícios\nTer: ${getRandom(dic.subjects)} + Revisão\nQua: ${getRandom(dic.subjects)} + Simulados\nQui: ${getRandom(dic.subjects)} + Leitura\nSex: ${getRandom(dic.subjects)} + Resumos\nSáb: Simulado Geral\nDom: Descanso`;
}

export function generateLessonPlan() {
  return `PLANO DE AULA\nDisciplina: ${getRandom(dic.subjects)}\nTema: Introdução aos conceitos básicos\n\n1. Aquecimento (10 min)\n2. Explicação teórica (30 min)\n3. Atividade prática em grupo (30 min)\n4. Correção e dúvidas (20 min)\n\nRecursos: Lousa, projetor, material impresso.`;
}

export function generateTimetable() {
  return `HORÁRIO ESCOLAR\n07:00 - ${getRandom(dic.subjects)}\n08:00 - ${getRandom(dic.subjects)}\n09:00 - Intervalo\n09:30 - ${getRandom(dic.subjects)}\n10:30 - ${getRandom(dic.subjects)}\n11:30 - ${getRandom(dic.subjects)}`;
}

export function generateExamQuestions() {
  return `QUESTÃO 1\nExplique o impacto da revolução industrial na sociedade moderna.\n\nQUESTÃO 2\nCalcule a área de um triângulo com base 5 e altura 10.\n\nQUESTÃO 3\nDescreva a diferença entre células eucarióticas e procarióticas.`;
}

export function generateReadingFiche() {
  return `FICHA DE LEITURA\nObra: ${getRandom(dic.books)}\nAutor: Machado de Assis (ou equivalente)\n\nResumo:\nA obra retrata a sociedade da época com forte ironia e crítica social, explorando a psicologia dos personagens centrais.\n\nCitação Marcante:\n"Aos vermes que primeiro roeram as frias carnes do meu cadáver..."`;
}

export function generateChallenge30Days() {
  return `DESAFIO 30 DIAS\nDia 1: Acordar 1h mais cedo.\nDia 2: Beber 2L de água.\nDia 3: Ler 10 páginas de um livro.\n...\nDia 15: Ficar 24h sem redes sociais.\n...\nDia 30: Escrever uma carta de agradecimento.`;
}
