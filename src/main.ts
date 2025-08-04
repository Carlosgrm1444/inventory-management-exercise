import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Validaciones globales
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // ✅ Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Inventario')
    .setDescription('Documentación de la API para gestión de inventario')
    .setVersion('1.0')
    .addBearerAuth() // para usar JWT desde Swagger UI
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // Disponible en /docs

  // ✅ Escucha en el puerto
  await app.listen(process.env.PORT || 3000);

  console.log('🔍 ENV config on Railway:', {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASSWORD,
  });
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
