import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Freelancer Marketplace API')
    .setDescription('API for Freelancer Marketplace')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  // Cast to any to avoid compile-time type mismatches when multiple @nestjs versions are present
  const document = SwaggerModule.createDocument(app as any, config as any);
  SwaggerModule.setup('api', app as any, document);

  app.enableCors();
  await app.listen(3000);
  console.log('Backend running on http://localhost:3000');
}

bootstrap();
