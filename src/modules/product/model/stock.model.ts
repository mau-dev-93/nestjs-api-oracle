import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, Max, Min } from 'class-validator';

export class StockModel {
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

	@IsNumber()
	@IsPositive()
	@Min(0)
	@Max(1000)
	@ApiProperty({
		name: 'stock',
		description: 'Stock del producto',
		required: true,
		type: Number,
	})
	stock: number;
}
