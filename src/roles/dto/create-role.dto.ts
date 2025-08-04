/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString({ message: 'El nombre del rol debe ser una cadena' })
  name: string;

  @IsString({ message: 'La descripción del rol debe ser una cadena' })
  description: string;

  activate?: boolean;
}
