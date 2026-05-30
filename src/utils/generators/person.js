import { generateCPF } from './cpf';
import { generateRG } from './rg';
import { generateAddress } from './location';
import { generatePhone, generateEmail } from './tech';

const firstNames = {
  M: ['João', 'Carlos', 'Pedro', 'Lucas', 'Mateus', 'Rafael', 'Bruno', 'Thiago', 'Felipe', 'Gustavo'],
  F: ['Maria', 'Ana', 'Julia', 'Beatriz', 'Mariana', 'Larissa', 'Camila', 'Letícia', 'Amanda', 'Fernanda']
};

const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins'];

export function generatePerson(ageFilter = 'adult', genderFilter = 'random') {
  const gender = genderFilter === 'random' ? (Math.random() > 0.5 ? 'M' : 'F') : genderFilter;
  const firstName = firstNames[gender][Math.floor(Math.random() * firstNames[gender].length)];
  const lastName1 = lastNames[Math.floor(Math.random() * lastNames.length)];
  const lastName2 = lastNames[Math.floor(Math.random() * lastNames.length)];
  const fullName = `${firstName} ${lastName1} ${lastName2}`;

  let age;
  if (ageFilter === 'adult') {
    age = Math.floor(Math.random() * (65 - 18 + 1)) + 18;
  } else if (ageFilter === 'senior') {
    age = Math.floor(Math.random() * (90 - 66 + 1)) + 66;
  } else {
    age = Math.floor(Math.random() * (17 - 1 + 1)) + 1; // minor
  }

  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - age;
  const birthMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const birthDay = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
  const birthDate = `${birthDay}/${birthMonth}/${birthYear}`;

  const cpf = generateCPF(true);
  const rg = generateRG(true);
  const address = generateAddress();
  const phone = generatePhone();
  const email = generateEmail().replace('usuario', firstName.toLowerCase());

  return `NOME: ${fullName}\nGÊNERO: ${gender === 'M' ? 'Masculino' : 'Feminino'}\nIDADE: ${age} anos (${birthDate})\n\nCPF: ${cpf}\nRG: ${rg}\n\nCONTATO:\nE-mail: ${email}\nCelular: ${phone}\n\nENDEREÇO:\n${address}`;
}
