import CardGenerator from '../components/CardGenerator';
import CardGeneratorMulti from '../components/CardGeneratorMulti';

import {
  generateGPS,
  generateRFID,
  generateSensorPayload
} from '../utils/generators/iot';

export default function IoT() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100 font-satoshi">IoT e Logística</h2>
        <p className="text-slate-400 mt-2">
          Geração de coordenadas geográficas, tags RFID e telemetria de sensores para logística.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <CardGenerator 
          title="Coordenadas GPS" 
          description="Latitude e Longitude (Território Brasileiro)" 
          generatorFn={generateGPS} 
          allowBulk={true}
        />
        <CardGenerator 
          title="Tag RFID (EPC Gen2)" 
          description="96-bits / 24 caracteres hexadecimais" 
          generatorFn={generateRFID} 
          allowBulk={true}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <CardGeneratorMulti 
          title="Payload de Telemetria (Sensores)" 
          description="JSON array com histórico de medições climáticas" 
          generatorFn={generateSensorPayload} 
          allowBulk={true}
        />
      </div>
    </div>
  );
}
