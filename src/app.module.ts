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

// function parseBool(value: string | undefined): boolean {
//   return value === 'true';
// }

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.MYSQLHOST,
    //   port: parseInt(process.env.MYSQLPORT || '3306', 10),
    //   username: process.env.MYSQLUSER,
    //   password: process.env.MYSQLPASSWORD,
    //   database: process.env.MYSQL_DATABASE,
    //   // autoLoadEntities: true,
    //   synchronize: false,
    // }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = {
          type: 'mysql' as const,
          host: configService.get<string>('MYSQLHOST'),
          port: parseInt(configService.get<string>('MYSQLPORT') || '3306', 10),
          username: configService.get<string>('MYSQLUSER'),
          password: configService.get<string>('MYSQLPASSWORD'),
          database: configService.get<string>('MYSQLDATABASE'),
          autoLoadEntities: true,
          synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true',
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
