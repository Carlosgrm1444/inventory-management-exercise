/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsString({
    message: 'El nombre de la categoría debe ser una cadena de texto',
  })
  name: string;

  @IsBoolean({ message: 'El campo "activate" debe ser true o false' })
  @IsOptional()
  activate?: boolean;
}
