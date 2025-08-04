import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StockService } from 'src/stock/stock.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Product } from './entity/product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly stockService: StockService, // <--- asegúrate de agregar esto
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() dto: CreateProductDto, data: Partial<Product>) {
    return this.productsService.create(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
    data: Partial<Product>,
  ) {
    return this.productsService.update(id, data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  // ! Actualizacion de Stock
  @UseGuards(AuthGuard('jwt'))
  @Post(':id/increase')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  increaseStock(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStockDto,
  ) {
    return this.productsService.increaseStock(id, dto.amount);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/decrease')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  decreaseStock(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStockDto,
  ) {
    return this.productsService.decreaseStock(id, dto.amount);
  }

  @Get('/product/:id')
  getHistoryByProduct(@Param('id', ParseIntPipe) id: number) {
    return this.stockService.findByProduct(id);
  }
}
