import { SwaggerModule } from '@nestjs/swagger';
import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { parse } from 'yaml';
import { AppModule } from './app.module';
import { MyLogger } from './logger/logger.service';
import 'dotenv/config';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(new MyLogger());
  const logger = new MyLogger();
  logger.setContext(bootstrap.name);

  process.on('unhandledRejection', (reason, promise) => {
    logger.error(
      `Unhandled ${promise} rejection occurred at: ${reason}`,
      bootstrap.name,
    );
  });
  process.on('uncaughtException', (err: Error) => {
    logger.warn(`Uncaught exception occurred at: ${err}`, bootstrap.name);
    process.exit(1);
  });

  const rootDirname = dirname(__dirname);
  const DOC_API = await readFile(join(rootDirname, 'doc', 'api.yaml'), 'utf-8');
  const document = parse(DOC_API);
  SwaggerModule.setup('doc', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(PORT, () => console.log(`🚀 Server listen port${PORT}`));
}
bootstrap();
