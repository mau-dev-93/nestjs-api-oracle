import { ConflictException, Injectable } from '@nestjs/common';
import { Order } from './entity/order.entity';
import {
	IsNull,
	LessThanOrEqual,
	MoreThanOrEqual,
	Not,
	Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientService } from '../client/client.service';
import { ProductService } from '../product/product.service';
import { OrderModel } from './model/order.model';

@Injectable()
export class OrderService {
	constructor(
		@InjectRepository(Order) private ordersRepository: Repository<Order>,
		private clientService: ClientService,
		private productService: ProductService,
	) {}

	async createOrder(order: OrderModel) {
		const clientExists = await this.clientService.getClientById(
			order.client.id,
		);
		if (!clientExists) {
			throw new ConflictException(
				`El cliente con el id ${order.client.id} no existe`,
			);
		}

		for (const product of order.products) {
			const productExists = await this.productService.getProductById(
				product.id,
			);
			if (!productExists) {
				throw new ConflictException(
					`El producto con el id ${product.id} no existe`,
				);
			}
		}

		return await this.ordersRepository.save(order);
	}

	async getOrderById(id: string) {
		return this.ordersRepository.findOne({
			where: { id },
		});
	}

	async getPendingOrders() {
		return this.ordersRepository.find({
			where: { confirmAt: IsNull() },
		});
	}

	async getConfirmedOrders(start: Date, end: Date) {
		if (start || end) {
			const query = this.ordersRepository
				.createQueryBuilder('order')
				.leftJoinAndSelect('order.client', 'client')
				.leftJoinAndSelect('order.products', 'product')
				.orderBy('order.confirmAt');

			if (start) {
				console.log(`start: ${start.getTime()}`);
				query.andWhere({ confirmAt: MoreThanOrEqual(start) });
			}

			if (end) {
				console.log(`end: ${end.getTime()}`);
				end.setHours(24);
				end.setMinutes(59);
				end.setSeconds(59);
				end.setMilliseconds(999);
				query.andWhere({ confirmAt: LessThanOrEqual(end) });
			}

			return await query.getMany();
		}

		return this.ordersRepository.find({
			where: { confirmAt: Not(IsNull()) },
			order: { confirmAt: 'DESC' },
		});
	}

	async confirmOrder(id: string) {
		const order = await this.getOrderById(id);
		if (!order) {
			throw new ConflictException(`La orden con el id ${id} no existe`);
		}

		if (order.confirmAt) {
			throw new ConflictException(
				`La orden con el id ${id} ya fue confirmada`,
			);
		}

		const rows = await this.ordersRepository.update(
			{ id },
			{ confirmAt: new Date() },
		);
		return rows.affected === 1;
	}

	async getClientOrders(clientId: string) {
		return this.ordersRepository
			.createQueryBuilder('order')
			.leftJoinAndSelect('order.client', 'client')
			.leftJoinAndSelect('order.products', 'product')
			.where('client.id = :clientId', { clientId })
			.orderBy('order.confirmAt')
			.getMany();
	}
}
