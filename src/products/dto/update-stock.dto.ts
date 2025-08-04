/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsInt, Min } from 'class-validator';

export class UpdateStockDto {
  @IsInt({ message: 'El campo "amount" debe ser un número entero' })
  @Min(1, { message: 'El campo "amount" debe ser mayor o igual a 1' })
  amount: number;
}
