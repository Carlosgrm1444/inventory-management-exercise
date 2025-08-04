/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { RolesModule } from './roles/roles.module';
import { StockModule } from './stock/stock.module';
import { UsersModule } from './users/users.module';

function parseBool(value: string | undefined): boolean {
  return value === 'true';
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.DB_HOST,
    //   port: parseInt(process.env.DB_PORT || '3306', 10),
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    //   autoLoadEntities: true,
    //   synchronize: parseBool(process.env.DB_SYNCHRONIZE),
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: configService.get.DB_HOST,
      port: parseInt(configService.get.DB_PORT || '3306', 10),
      username: configService.get.DB_USERNAME,
      password: configService.get.DB_PASSWORD,
      database: configService.get.DB_NAME,
      autoLoadEntities: true,
      synchronize: parseBool(configService.get.DB_SYNCHRONIZE),
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
