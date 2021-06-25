import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';
import { OrdersController } from './orders/orders.controller';
import { OrderService } from './orders/orders.service';
import { ProductsController } from './products/products.controller';
import { ProductService } from './products/products.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      database: 'mysql',
      username: 'root',
      password: 'mysql',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [AppController, ProductsController, OrdersController],
  providers: [AppService, ProductService, OrderService],
})
export class AppModule { }
