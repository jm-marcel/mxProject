import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { OrderService } from './orders.service';

@Controller('orders')
export class OrdersController {

    constructor(private orderService: OrderService) { }

    @Get('readAll')
    readAll(): Promise<Order[]> {
        return this.orderService.readAll();
    }

    @Get(':id/readOne')
    readOne(@Param('id') id): Promise<Order> {
        return this.orderService.read(id);
    }

    @Post('create')
    async create(@Body() order: Order): Promise<Order> {
        return this.orderService.create(order);
    }

    @Put(':id/update')
    async update(@Param('id') id, @Body() order: Order): Promise<any> {
        order.id = Number(id);
        return this.orderService.update(order);
    }

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
        return this.orderService.delete(id);
    }

}
