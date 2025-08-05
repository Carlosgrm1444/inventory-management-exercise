import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString({
    message: 'El nombre de la categoría debe ser una cadena de texto',
  })
  name: string;

  @ApiProperty()
  @IsString({
    message: 'La descripción debe ser una cadena de texto',
  })
  description: string;

  @ApiProperty()
  @IsBoolean({ message: 'El campo "activate" debe ser true o false' })
  @IsOptional()
  activate?: boolean;
}
