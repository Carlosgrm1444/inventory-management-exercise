/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'La descripción del producto es obligatoria' })
  description: string;

  @IsNumber()
  @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
  price: number;

  @IsInt()
  @Min(0, { message: 'El stock debe ser mayor o igual a 0' })
  stock: number;

  @IsInt({ message: 'La categoría debe ser un ID numérico' })
  categoryId: number;
}
