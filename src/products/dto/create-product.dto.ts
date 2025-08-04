/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'La descripción del producto es obligatoria' })
  description: string;

  @ApiProperty()
  @IsNumber()
  @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
  price: number;

  @ApiProperty()
  @IsInt()
  @Min(0, { message: 'El stock debe ser mayor o igual a 0' })
  stock: number;

  @ApiProperty()
  @IsInt({ message: 'La categoría debe ser un ID numérico' })
  categoryId: number;
}
