// src/stock/entities/stock-movement.entity.ts
import { Product } from 'src/products/entity/product.entity'; // ✅ importa desde aquí
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('stock_movements')
export class StockMovement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: 'IN' | 'OUT';

  @Column()
  amount: number;

  @ManyToOne(() => Product, (product) => product.movements)
  product: Product;

  @CreateDateColumn()
  created_at: Date;
}
