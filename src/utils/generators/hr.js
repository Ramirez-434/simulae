const departamentos = ['Tecnologia', 'Financeiro', 'Marketing', 'Recursos Humanos', 'Vendas', 'Operações', 'Produto'];
const niveis = ['Júnior', 'Pleno', 'Sênior', 'Especialista', 'Líder', 'Gerente', 'Diretor'];
const profissoes = [
  'Desenvolvedor Software', 'Analista de Dados', 'Designer UX/UI', 'Engenheiro DevOps',
  'Assistente', 'Coordenador', 'Consultor', 'Analista de Sistemas'
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateCargo() {
  const dpto = getRandomItem(departamentos);
  const nivel = getRandomItem(niveis);
  const prof = getRandomItem(profissoes);
  return `${prof} ${nivel} - ${dpto}`;
}

export function generatePonto() {
  // Gera 5 dias uteis de ponto
  const registros = [];
  let d = new Date();
  
  for(let i=0; i<5; i++) {
    d.setDate(d.getDate() - 1);
    // Ignora fim de semana
    if (d.getDay() === 0 || d.getDay() === 6) continue;
    
    // Entrada: ~09:00, Almoço: ~12:00, Retorno: ~13:00, Saída: ~18:00
    const m1 = getRandomInt(50, 70); // 08:50 as 09:10
    const m2 = getRandomInt(0, 15);  // 12:00 as 12:15
    const m3 = getRandomInt(50, 70); // 12:50 as 13:10
    const m4 = getRandomInt(0, 20);  // 18:00 as 18:20
    
    const fmt = (hr, min) => `${hr.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}`;
    
    registros.push({
      data: d.toLocaleDateString('pt-BR'),
      entrada: fmt(8 + Math.floor(m1/60), m1%60),
      saida_almoco: fmt(12, m2),
      retorno_almoco: fmt(12 + Math.floor(m3/60), m3%60),
      saida: fmt(18, m4)
    });
  }
  
  return JSON.stringify(registros.reverse(), null, 2);
}

export function generateHolerite() {
  const bruto = getRandomInt(2000, 15000);
  
  // Simulação muito simplificada
  let inss = 0;
  if(bruto <= 1412) inss = bruto * 0.075;
  else if(bruto <= 2666) inss = bruto * 0.09;
  else if(bruto <= 4000) inss = bruto * 0.12;
  else inss = bruto * 0.14;
  
  let baseIr = bruto - inss;
  let irrf = 0;
  if(baseIr > 2112 && baseIr <= 2826) irrf = (baseIr * 0.075) - 158.40;
  else if(baseIr > 2826 && baseIr <= 3751) irrf = (baseIr * 0.15) - 370.40;
  else if(baseIr > 3751 && baseIr <= 4664) irrf = (baseIr * 0.225) - 651.73;
  else if(baseIr > 4664) irrf = (baseIr * 0.275) - 884.96;
  
  if (irrf < 0) irrf = 0;
  
  const liquido = bruto - inss - irrf;

  const currency = (val) => `R$ ${val.toFixed(2).replace('.',',')}`;

  return `*** RECIBO DE PAGAMENTO DE SALÁRIO ***
Cargo: ${generateCargo()}
Mês Referência: 10/2025

VENCIMENTOS
Salário Base: ${currency(bruto)}

DESCONTOS
INSS: ${currency(inss)}
IRRF: ${currency(irrf)}

TOTAL LÍQUIDO A RECEBER: ${currency(liquido)}

FGTS Depositado (8%): ${currency(bruto * 0.08)}`;
}
