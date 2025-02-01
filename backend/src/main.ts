import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppConfigType } from '../config/config.type';
import { AppModule } from './app.module';
import { SwaggerHelper } from './common/helpers/swagger.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Cars-market')
    .setDescription('cars-market')
    .setVersion('1.0')
    .addBearerAuth({
      in: 'header',
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerHelper.setDefaultResponses(document);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelsExpandDepth: 5,
      persistAuthorization: true,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);
  const appConfigs = configService.get<AppConfigType>('app');

  await app.listen(appConfigs.port, () => {
    console.log(
      `Server is running on http://${appConfigs.host}:${appConfigs.port}`,
    );
    console.log(
      `Swagger is running on http://${appConfigs.host}:${appConfigs.port}/docs`,
    );
  });
}
bootstrap();
// process.on('warning', e => console.warn(e.stack))
