import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './modules/product/product.module';
import { DataSourceOptions } from 'typeorm';
import AppDataSource from '../datasource';
import { ClientModule } from './modules/client/client.module';
import { OrderModule } from './modules/order/order.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(AppDataSource.options as DataSourceOptions),
		ProductModule,
		ClientModule,
		OrderModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
