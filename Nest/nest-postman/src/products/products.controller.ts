import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Redirect,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.getById(id);
  }

  @Get()
  getAllProducts() {
    return this.productsService.geAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  createProduct(@Body() createProduct: CreateProductDto) {
    return this.productsService.create(createProduct);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return id;
  }

  @Put(':id')
  updateProduct(
    @Body() updateProduct: UpdateProductDto,
    @Param('id') id: string,
  ) {
    return id;
  }
}
