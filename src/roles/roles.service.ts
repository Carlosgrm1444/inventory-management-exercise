import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './entity/rol.entity';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private roleRepository: Repository<Rol>,
  ) {}

  // src/roles/roles.service.ts
  create(data: CreateRoleDto) {
    const newRole = this.roleRepository.create(data);
    return this.roleRepository.save(newRole);
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
