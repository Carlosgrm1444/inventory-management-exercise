/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty()
  @IsString({ message: 'El nombre del rol debe ser una cadena' })
  name: string;

  @ApiProperty()
  @IsString({ message: 'La descripción del rol debe ser una cadena' })
  description: string;

  @ApiProperty()
  activate?: boolean;
}
