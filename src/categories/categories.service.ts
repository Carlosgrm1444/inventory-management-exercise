import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  create(data: Partial<Category>) {
    return this.categoryRepository.save(data);
  }

  findAll() {
    return this.categoryRepository.find({ relations: ['products'] }); // si quieres traer productos
  }

  update(id: number, data: Partial<Category>) {
    return this.categoryRepository.update(id, data);
  }

  remove(id: number) {
    return this.categoryRepository.delete(id);
  }
}
