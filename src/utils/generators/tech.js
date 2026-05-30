// Identificadores e Segurança
export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function generatePassword(length = 16) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

export function generateApiKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = 'pk_test_';
  for (let i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

export function generateJWT() {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({
    sub: generateUUID(),
    name: "Usuário Teste",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600
  }));
  // Mock signature
  const signature = btoa(generateApiKey()).replace(/=/g, '').substring(0, 43);
  return `${header}.${payload}.${signature}`;
}

export async function generateHash(text = "GeradorBrasil") {
  const msgUint8 = new TextEncoder().encode(text + Math.random().toString());
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Redes e Contatos
export function generateIPv4() {
  return Array.from({length: 4}, () => Math.floor(Math.random() * 256)).join('.');
}

export function generateIPv6() {
  return Array.from({length: 8}, () => Math.floor(Math.random() * 65536).toString(16)).join(':');
}

export function generateMacAddress() {
  return Array.from({length: 6}, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase()).join(':');
}

export function generateUserAgent() {
  const uas = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Safari/605.1.15',
    'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0'
  ];
  return uas[Math.floor(Math.random() * uas.length)];
}

export function generateEmail() {
  const names = ['joao', 'maria', 'teste', 'admin', 'contato', 'dev'];
  const domains = ['gmail.com', 'outlook.com', 'empresa.com.br', 'startup.io'];
  const name = names[Math.floor(Math.random() * names.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const num = Math.floor(Math.random() * 999);
  return `${name}${num}@${domain}`;
}

export function generatePhone() {
  const ddd = Math.floor(Math.random() * 89) + 11;
  const num1 = Math.floor(Math.random() * 9000) + 1000;
  const num2 = Math.floor(Math.random() * 9000) + 1000;
  return `(${ddd}) 9${num1}-${num2}`;
}

// Dados e Estruturas
export function generateJSON() {
  const obj = {
    id: generateUUID(),
    name: 'Objeto de Teste',
    isActive: Math.random() > 0.5,
    roles: ['admin', 'user'],
    metadata: {
      createdAt: new Date().toISOString(),
      ip: generateIPv4()
    }
  };
  return JSON.stringify(obj, null, 2);
}

export function generateSQLInsert() {
  const table = 'users';
  const id = Math.floor(Math.random() * 1000);
  const email = generateEmail();
  return `INSERT INTO ${table} (id, name, email, status)\nVALUES (${id}, 'Usuário ${id}', '${email}', 'active');`;
}

export function generateLoremIpsum() {
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
}

export function generateRandomNumber() {
  return Math.floor(Math.random() * 1000000).toString();
}

export function generateRegex() {
  const patterns = [
    '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$', // Email
    '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$', // Password
    '^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}$' // CPF
  ];
  return patterns[Math.floor(Math.random() * patterns.length)];
}
