import * as fs from 'fs';
import * as path from 'path';
// import envData from './env';

export const config = (): object => {
  let config = null;
  if (config == null) {
    const localEnv = 'test-85';
    const nodeEnv = process.env.NODE_ENV || localEnv;

    let envPath: string;

    if (nodeEnv === localEnv) {
      envPath = path.join(process.cwd(), '/src/config/env.json');
    } else {
      envPath = path.join(process.cwd(), '/config/env.json');
    }

    const env = JSON.parse(fs.readFileSync(envPath, 'utf8'));
    const result = env[nodeEnv];

    if (result == null) {
      throw 'Environment configuration not found!';
    }
    const packagePath = path.join(process.cwd(), 'package.json');
    const packageJson = fs.readFileSync(packagePath, 'utf-8');
    const data = JSON.parse(packageJson);
    result.appName = data.name;
    result.version = data.version;
    config = result;
  }

  return config;
};
config();

export const setMongoCreds = (): string => {
  const conf = config();

  const mongoADDR =
    process.env.MONGODB_PORT_27017_TCP_ADDR || conf['mongoHost'] || 'localhost';
  //console.log(conf['mongoHost']);
  const mongoPORT =
    process.env.MONGODB_PORT_27017_TCP_PORT || conf['mongoPort'] || 21017;
  const mongoURI = `mongodb://${mongoADDR}:${mongoPORT}/${conf['dbName']}`;

  return mongoURI;
};

export const mongoConnectionString = setMongoCreds();
