import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockMovement } from './entity/stock-movement.entity';

@Injectable()
export class StockService {
  [x: string]: any;
  constructor(
    @InjectRepository(StockMovement)
    private stockRepo: Repository<StockMovement>,
  ) {}

  findByProduct(productId: number) {
    return this.stockRepo.find({
      where: { product: { id: productId } },
      relations: ['product'],
      order: { created_at: 'DESC' },
    });
  }
}
