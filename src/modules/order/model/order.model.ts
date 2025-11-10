import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	ArrayNotEmpty,
	IsArray,
	IsDate,
	IsNotEmpty,
	IsOptional,
	IsUUID,
} from 'class-validator';
import { ClientModel } from 'src/modules/client/model/client.model';
import { ProductModel } from 'src/modules/product/model/product.model';

export class OrderModel {
	@ApiProperty({
		name: 'id',
		description: 'id de la orden',
		required: false,
		type: String,
	})
	@IsOptional()
	@IsUUID()
	id?: string;

	@ApiProperty({
		name: 'createdAt',
		description: 'fecha de creación de la orden',
		required: false,
		type: Date,
	})
	@IsOptional()
	@IsDate()
	@Type(() => Date)
	createdAt?: Date;

	@ApiProperty({
		name: 'updatedAt',
		description: 'fecha de actualización de la orden',
		required: false,
		type: Date,
	})
	@IsOptional()
	@IsDate()
	@Type(() => Date)
	updatedAt?: Date;

	@ApiProperty({
		name: 'confirmAt',
		description: 'fecha de confirmación de la orden',
		required: false,
		type: Date,
	})
	@IsOptional()
	@IsDate()
	@Type(() => Date)
	confirmAt?: Date;

	@ApiProperty({
		name: 'client',
		description: 'cliente de la orden',
		required: true,
		type: ClientModel,
	})
	@IsNotEmpty()
	@Type(() => ClientModel)
	client!: ClientModel;

	@ApiProperty({
		name: 'products',
		description: 'productos de la orden',
		required: true,
		type: [ProductModel],
	})
	@IsNotEmpty()
	@IsArray()
	@ArrayNotEmpty()
	@Type(() => ProductModel)
	products!: ProductModel[];
}
