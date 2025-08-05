import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StockService } from 'src/stock/stock.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Product } from './entity/product.entity';
import { ProductsService } from './products.service';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly stockService: StockService, // <--- asegúrate de agregar esto
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
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

  @UseGuards(AuthGuard('jwt'))
  @Get('/product/:id')
  getHistoryByProduct(@Param('id', ParseIntPipe) id: number) {
    return this.stockService.findByProduct(id);
  }

  // ! Filtros de busqueda
  @UseGuards(AuthGuard('jwt'))
  @Get('search')
  async search(@Query('q') query: string) {
    return this.productsService.searchByNameOrDescription(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('by-category')
  async findByCategory(@Query('categoryId') categoryId: number) {
    return this.productsService.findByCategory(+categoryId);
  }
}
