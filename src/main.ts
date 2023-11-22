import * as fs from 'fs';
import * as path from 'path';

import {
  CheckRegionInterceptor,
  CustomBadRequestInterceptor,
  ValidateRegionInterceptor,
} from './common/interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import regions from './common/enum/region.enum';
import { setMongoCreds } from './config/db';
import { ValidationPipe } from '@nestjs/common';

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
    config = result;
  }

  return config;
};
config();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const conf = config();

  app.enableCors({
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'Put', 'POST', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  app.useGlobalInterceptors(
    new CheckRegionInterceptor(),
    new ValidateRegionInterceptor(regions),
    new CustomBadRequestInterceptor(),
  );

  const options = new DocumentBuilder()
    .setTitle('Mycook swagger')
    .setDescription('The Mycook API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT || conf['port'] || 3000);
  //await app.listen(process.env.PORT || 3000);
}

setMongoCreds();
bootstrap();
