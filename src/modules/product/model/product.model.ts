import { ApiProperty } from '@nestjs/swagger';
import {
	IsBoolean,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
} from 'class-validator';

export class ProductModel {
	@IsOptional()
	@IsNumber()
	@IsPositive()
	@ApiProperty({
		name: 'id',
		description: 'ID del producto',
		required: false,
		type: Number,
	})
	id?: number;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		name: 'name',
		description: 'Nombre del producto',
		required: true,
		type: String,
	})
	name!: string;

	@IsNumber()
	@IsPositive()
	@IsNotEmpty()
	@ApiProperty({
		name: 'price',
		description: 'Precio del producto',
		required: true,
		type: Number,
	})
	price!: number;

	@IsNumber()
	@IsPositive()
	@IsNotEmpty()
	@ApiProperty({
		name: 'stock',
		description: 'Stock del producto',
		required: true,
		type: Number,
	})
	stock!: number;

	@IsOptional()
	@IsBoolean()
	@ApiProperty({
		name: 'deleted',
		description: 'Indica si el producto ha sido eliminado',
		required: false,
		type: Boolean,
	})
	deleted?: boolean;
}
