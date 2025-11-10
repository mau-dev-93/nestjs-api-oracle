import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderModel } from './model/order.model';
import { ParseDatePipe } from 'src/pipes/parse-date/parse-date.pipe';
import {
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';

@Controller('api/v1/orders')
@ApiTags('Orders')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post()
	@ApiOperation({ description: 'Crea una orden' })
	@ApiBody({
		description: 'Crea una orden',
		type: OrderModel,
		examples: {
			ejemplo1: {
				value: {
					confirmAt: '2022-01-23',
					client: {
						id: 1,
					},
					products: [
						{
							id: 1,
						},
						{
							id: 2,
						},
					],
				},
			},
			ejemplo2: {
				value: {
					confirmAt: '2022-01-25',
					client: {
						id: 2,
					},
					products: [
						{
							id: 3,
						},
						{
							id: 4,
						},
					],
				},
			},
		},
	})
	@ApiResponse({
		status: 201,
		description: 'Orden creada exitosamente',
	})
	@ApiResponse({
		status: 409,
		description:
			'El cliente no existe. <br/> El producto no existe. <br/> El producto está inactivo.',
	})
	async createOrder(@Body() order: OrderModel) {
		return await this.orderService.createOrder(order);
	}

	@Get('/pending')
	@ApiOperation({ description: 'Obtiene todas las órdenes pendientes' })
	@ApiResponse({
		status: 200,
		description: 'Órdenes pendientes obtenidas exitosamente',
	})
	async getPendingOrders() {
		return await this.orderService.getPendingOrders();
	}

	@Get('/confirmed')
	@ApiOperation({
		description:
			'Obtiene todas las órdenes confirmadas, filtro por fecha de inicio y fin',
	})
	@ApiQuery({
		name: 'start',
		type: Date,
		required: false,
		description:
			'Fecha de inicio para filtrar las órdenes confirmadas (formato: YYYY-MM-DD)',
	})
	@ApiResponse({
		status: 200,
		description: 'Órdenes confirmadas obtenidas exitosamente',
	})
	async getConfirmedOrders(
		@Query('start', ParseDatePipe) start: Date,
		@Query('end', ParseDatePipe) end: Date,
	) {
		return await this.orderService.getConfirmedOrders(start, end);
	}

	@Get('/:id')
	@ApiOperation({ description: 'Devuelve una orden por su ID' })
	@ApiParam({
		name: 'id',
		type: String,
		required: true,
		description: 'ID de la orden a obtener',
	})
	async getOrderById(@Param('id') id: string) {
		return await this.orderService.getOrderById(id);
	}

	@Get('/client/:clientId')
	@ApiOperation({
		description: 'Devuelve las órdenes de un cliente por su ID',
	})
	@ApiParam({
		name: 'clientId',
		type: String,
		required: true,
		description: 'ID del cliente cuyas órdenes se van a obtener',
	})
	@ApiResponse({
		status: 200,
		description: 'Órdenes del cliente obtenidas exitosamente',
	})
	async getClientOrders(@Param('clientId') clientId: string) {
		return await this.orderService.getClientOrders(clientId);
	}

	@Patch('/:id/confirm')
	@ApiOperation({ description: 'Confirma una orden por su ID' })
	@ApiParam({
		name: 'id',
		type: String,
		required: true,
		description: 'ID de la orden a confirmar',
	})
	@ApiResponse({
		status: 200,
		description: 'Orden confirmada exitosamente',
	})
	@ApiResponse({
		status: 409,
		description: 'Orden ya confirmada',
	})
	async confirmOrder(@Param('id') id: string) {
		return await this.orderService.confirmOrder(id);
	}
}
