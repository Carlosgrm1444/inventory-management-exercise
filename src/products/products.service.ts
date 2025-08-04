import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { StockMovement } from '../stock/entity/stock-movement.entity';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(StockMovement) // asegúrate de importar bien esta entidad
    private stockRepo: Repository<StockMovement>,
  ) {}

  create(data: Partial<Product>) {
    return this.productRepository.save(data);
  }

  findAll() {
    return this.productRepository.find({ relations: ['category'] }); // opcional si quieres traer la categoría
  }

  update(id: number, data: Partial<Product>) {
    return this.productRepository.update(id, data);
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }

  // ! Control de stock
  async increaseStock(id: number, amount: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Producto no encontrado');

    product.stock += amount;
    await this.productRepository.save(product);

    await this.stockRepo.save({
      type: 'IN',
      amount,
      product,
    });

    return product;
  }

  async decreaseStock(id: number, amount: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Producto no encontrado');
    if (product.stock < amount)
      throw new BadRequestException('Stock insuficiente');

    product.stock -= amount;
    await this.productRepository.save(product);

    await this.stockRepo.save({
      type: 'OUT',
      amount,
      product,
    });

    return product;
  }

  // ! filtros de busqueda
  async searchByNameOrDescription(term: string): Promise<Product[]> {
    return this.productRepository.find({
      where: [{ name: Like(`%${term}%`) }, { description: Like(`%${term}%`) }],
      relations: ['category'],
    });
  }

  async findByCategory(categoryId: number): Promise<Product[]> {
    return this.productRepository.find({
      where: {
        category: {
          id: categoryId,
        },
      },
      relations: ['category'],
    });
  }
}
