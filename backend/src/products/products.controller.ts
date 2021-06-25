import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { ProductService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private productService: ProductService) { }

    @Get(':name/findByName')
    findByName(@Param('name') name): Promise<Product> {
        return this.productService.findByName(name);
    }

    @Get('readAll')
    readAll(): Promise<Product[]> {
        return this.productService.readAll();
    }

    @Get(':id/readOne')
    readOne(@Param('id') id): Promise<Product> {
        return this.productService.read(id);
    }

    @Post('create')
    async create(@Body() product: Product): Promise<any> {
        return this.productService.create(product);
    }

    @Put(':id/update')
    async update(@Param('id') id, @Body() product: Product): Promise<any> {
        product.id = Number(id);
        return this.productService.update(product);
    }

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
        return this.productService.delete(id);
    }

}