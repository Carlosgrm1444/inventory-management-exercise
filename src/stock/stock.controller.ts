import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Stock')
@ApiBearerAuth()
@Controller('stock')
export class StockController {}
