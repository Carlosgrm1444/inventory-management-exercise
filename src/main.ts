import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { RolesModule } from './roles/roles.module';
import { StockModule } from './stock/stock.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // Usa .env solo localmente. Railway no lo necesita.
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // 🔍 Cargar y validar manualmente
        const host = configService.get<string>('DB_HOST');
        const portStr = configService.get<string>('DB_PORT') || '3306';
        const port = parseInt(portStr, 10);
        const username = configService.get<string>('DB_USERNAME');
        const password = configService.get<string>('DB_PASSWORD');
        const database = configService.get<string>('DB_NAME');
        const synchronizeStr = configService.get<string>('DB_SYNCHRONIZE');
        const synchronize = synchronizeStr === 'true';

        const config = {
          type: 'mysql' as const,
          host,
          port,
          username,
          password,
          database,
          autoLoadEntities: true,
          synchronize,
        };

        // 🚨 Validación básica (opcional)
        if (!host || !username || !password || !database) {
          console.error(
            '❌ Error: Faltan variables de entorno para la base de datos',
          );
        }

        // ✅ Mostrar configuración usada
        console.log('🌐 TypeORM Config desde entorno:', config);

        return config;
      },
    }),

    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    RolesModule,
    StockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
