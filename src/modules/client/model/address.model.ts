import { ApiProperty } from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
} from 'class-validator';

export class AddressModel {
	@ApiProperty({
		name: 'id',
		type: Number,
		required: false,
		description: 'id de dirección',
	})
	@IsOptional()
	@IsPositive()
	@IsNumber()
	id?: number;

	@ApiProperty({
		name: 'country',
		type: String,
		required: true,
		description: 'pais de la dirección',
	})
	@IsNotEmpty()
	@IsString()
	country!: string;

	@ApiProperty({
		name: 'province',
		type: String,
		required: true,
		description: 'provincia de la dirección',
	})
	@IsNotEmpty()
	@IsString()
	province!: string;

	@ApiProperty({
		name: 'town',
		type: String,
		required: true,
		description: 'ciudad de la dirección',
	})
	@IsNotEmpty()
	@IsString()
	town!: string;

	@ApiProperty({
		name: 'calle',
		type: String,
		required: true,
		description: 'calle de la dirección',
	})
	@IsNotEmpty()
	@IsString()
	street!: string;
}
