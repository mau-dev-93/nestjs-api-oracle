import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { ProductModule } from '../product/product.module';
import { ClientModule } from '../client/client.module';

@Module({
	imports: [TypeOrmModule.forFeature([Order]), ClientModule, ProductModule],
	providers: [OrderService],
	controllers: [OrderController],
})
export class OrderModule {}
