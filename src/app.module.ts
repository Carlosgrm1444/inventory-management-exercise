/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
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
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get('DB_HOST');
        const port = configService.get('DB_PORT');
        const user = configService.get('DB_USERNAME');
        const pass = configService.get('DB_PASSWORD');
        const db = configService.get('DB_NAME');

        const config = {
          type: 'mysql' as const,
          host,
          port: parseInt(port || '3306', 10),
          username: user,
          password: pass,
          database: db,
          synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
          autoLoadEntities: true,
        };

        console.log('🌐 TypeORM Config cargado:', config);
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
