function getRandomFloat(min, max, decimals = 6) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateGPS() {
  // Limites aproximados do Brasil
  // Lat: 5.2 (Norte) a -33.7 (Sul)
  // Lng: -34.8 (Leste) a -73.9 (Oeste)
  const lat = getRandomFloat(-33.7, 5.2);
  const lng = getRandomFloat(-73.9, -34.8);
  
  return `${lat}, ${lng}`;
}

export function generateRFID() {
  // Padrão comum EPC Gen2 RFID é de 96 bits (24 caracteres hexadecimais)
  const chars = '0123456789ABCDEF';
  let rfid = '';
  for (let i = 0; i < 24; i++) {
    rfid += chars.charAt(getRandomInt(0, 15));
  }
  return rfid;
}

export function generateSensorPayload() {
  const readingsCount = getRandomInt(5, 12);
  const payload = [];
  let baseTemp = getRandomFloat(20, 30, 2);
  let baseHum = getRandomFloat(40, 80, 1);
  let time = Date.now() - (readingsCount * 60000); // starts X minutes ago

  for (let i = 0; i < readingsCount; i++) {
    time += getRandomInt(55000, 65000); // approx 1 minute interval
    baseTemp += getRandomFloat(-0.5, 0.5, 2);
    baseHum += getRandomFloat(-1.0, 1.0, 1);
    
    payload.push({
      timestamp: new Date(time).toISOString(),
      temperature_celsius: parseFloat(baseTemp.toFixed(2)),
      humidity_percent: parseFloat(baseHum.toFixed(1)),
      pressure_hpa: getRandomInt(1005, 1025)
    });
  }

  return JSON.stringify({
    device_id: `DEV-${generateRFID().substring(0,8)}`,
    firmware: "v2.1.4",
    readings: payload
  }, null, 2);
}
