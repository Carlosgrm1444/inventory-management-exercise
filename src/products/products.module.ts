import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockModule } from 'src/stock/stock.module'; // <-- Importa aquí
import { StockMovement } from '../stock/entity/stock-movement.entity';
import { Product } from './entity/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, StockMovement]), StockModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
