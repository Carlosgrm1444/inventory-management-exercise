import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './entity/rol.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private roleRepository: Repository<Rol>,
  ) {}

  create(data: Partial<Rol>) {
    return this.roleRepository.save(data);
  }

  findAll() {
    return this.roleRepository.find();
  }

  update(id: number, data: Partial<Rol>) {
    return this.roleRepository.update(id, data);
  }

  remove(id: number) {
    return this.roleRepository.delete(id);
  }
}
