import configuration from './config/app/configuration';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { CustomValidationPipe } from './pipes/custom-validation.pipe';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalPipes(new CustomValidationPipe());

  if (configuration().env != 'production') {
    const options = new DocumentBuilder()
      .setTitle('Zenklub')
      .setDescription('The zenklub API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
  }

  app.enableCors();

  await app.listen(configuration().port, '0.0.0.0');

  Logger.log(`Server listening at port: ${configuration().port}`);
}

bootstrap();
