import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from 'process';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('🌐 ENV desde Railway:', {
    type: 'mysql',
    host: process.env.MYSQLHOST,
    port: parseInt(process.env.MYSQLPORT || '3306', 10),
    username: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQL_DATABASE,
    autoLoadEntities: false,
  });

  //   console.log('🌐 ENV desde Railway:', {
  //   type: 'mysql',
  //   host: configService.get('DB_HOST'),
  //   port: configService.get('DB_PORT'),
  //   username: configService.get('DB_USERNAME'),
  //   password: configService.get('DB_PASSWORD'),
  //   database: configService.get('DB_NAME'),
  // });

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
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
