function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateCartaoSUS() {
  // Simulação simplificada de Cartão SUS (15 dígitos, geralmente começa com 7 ou 8)
  const prefix = getRandomItem(["7", "8", "1", "2"]);
  let number = prefix;
  for(let i=0; i<10; i++){
    number += getRandomInt(0, 9);
  }
  
  // Para ficar mais realista, adicionamos dígitos finais baseados em soma simples (mock)
  const fakeCheckDigits = getRandomInt(1000, 9999).toString();
  const cns = number + fakeCheckDigits;
  
  // Formatando: 000 0000 0000 0000
  return cns.replace(/(\d{3})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4");
}

export function generateBloodType() {
  const types = ['A', 'B', 'AB', 'O'];
  const rhesus = ['+', '-'];
  return `${getRandomItem(types)}${getRandomItem(rhesus)}`;
}

export function generateVitals() {
  const hr = getRandomInt(60, 100);
  const glucose = getRandomInt(70, 110);
  const weight = (Math.random() * (120 - 50) + 50).toFixed(1);
  const height = getRandomInt(150, 195);
  const temp = (Math.random() * (37.2 - 36.1) + 36.1).toFixed(1);

  return JSON.stringify({
    frequencia_cardiaca_bpm: hr,
    glicemia_mg_dl: glucose,
    peso_kg: parseFloat(weight),
    altura_cm: height,
    temperatura_c: parseFloat(temp)
  }, null, 2);
}

export function generateCID() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letter = letters.charAt(getRandomInt(0, 25));
  const numbers = getRandomInt(0, 99).toString().padStart(2, '0');
  const subcategory = getRandomInt(0, 9);
  
  return `${letter}${numbers}.${subcategory}`;
}
