const products = {
  eletronicos: ['Smartphone Z', 'Notebook Pro', 'Smart TV 4K', 'Fone de Ouvido Bluetooth', 'Monitor UltraWide', 'Teclado Mecânico'],
  vestuario: ['Camiseta Algodão', 'Calça Jeans', 'Tênis Esportivo', 'Jaqueta de Couro', 'Meia Térmica', 'Boné Liso'],
  casa: ['Cafeteira Expresso', 'Aspirador Robô', 'Jogo de Panelas', 'Mesa de Jantar', 'Luminária de Mesa', 'Cadeira Ergônomica']
};

const reviews = [
  "Excelente produto, chegou antes do prazo e superou as expectativas!",
  "Qualidade mediana, mas pelo preço cobrado vale a pena.",
  "Produto veio com defeito, já solicitei a troca. Não recomendo no momento.",
  "Gostei muito. O material é muito bom e o acabamento impecável.",
  "A entrega atrasou um pouco, mas o produto em si é perfeito.",
  "Totalmente insatisfeito. A cor na foto é diferente da realidade.",
  "Comprei para presentear e a pessoa adorou. Cinco estrelas!"
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateSKU() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const prefix = Array(3).fill(0).map(() => letters.charAt(getRandomInt(0, 25))).join('');
  const suffix = Array(4).fill(0).map(() => getRandomInt(0, 9)).join('');
  return `${prefix}-${suffix}`;
}

export function generateBarcodeEAN() {
  let ean = "789"; // Prefix Brasil
  for (let i = 0; i < 9; i++) {
    ean += getRandomInt(0, 9);
  }
  // Cálculo do dígito verificador EAN-13
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(ean.charAt(i)) * (i % 2 === 0 ? 1 : 3);
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  return ean + checkDigit;
}

export function generateMockProduct() {
  const categories = Object.keys(products);
  const category = getRandomItem(categories);
  const name = getRandomItem(products[category]);
  const price = (Math.random() * 5000 + 10).toFixed(2);
  const weight = (Math.random() * 5 + 0.1).toFixed(2);
  const discount = getRandomItem([0, 5, 10, 15, 20]);
  
  return JSON.stringify({
    sku: generateSKU(),
    nome: name,
    categoria: category.charAt(0).toUpperCase() + category.slice(1),
    preco: parseFloat(price),
    desconto_percentual: discount,
    peso_kg: parseFloat(weight),
    estoque: getRandomInt(0, 200)
  }, null, 2);
}

export function generateReview() {
  const review = getRandomItem(reviews);
  const stars = review.includes("Excelente") || review.includes("adorou") ? 5 
    : review.includes("mediana") ? 3 
    : review.includes("defeito") || review.includes("insatisfeito") ? 1 
    : getRandomInt(2, 4);
    
  const date = new Date();
  date.setDate(date.getDate() - getRandomInt(1, 100));
  
  return `Avaliação: ${'⭐'.repeat(stars)}\nData: ${date.toLocaleDateString('pt-BR')}\nComentário: "${review}"`;
}
