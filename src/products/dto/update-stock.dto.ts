import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class UpdateStockDto {
  @ApiProperty()
  @IsInt({ message: 'El campo "amount" debe ser un número entero' })
  @ApiProperty()
  @Min(1, { message: 'El campo "amount" debe ser mayor o igual a 1' })
  amount: number;
}
