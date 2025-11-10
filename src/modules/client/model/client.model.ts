import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AddressModel } from './address.model';
import {
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
} from 'class-validator';

export class ClientModel {
	@ApiProperty({
		name: 'id',
		type: Number,
		required: false,
		description: 'id del cliente',
	})
	@IsOptional()
	@IsPositive()
	@IsNumber()
	id: number;

	@ApiProperty({
		name: 'name',
		type: String,
		required: true,
		description: 'nombre del cliente',
	})
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty({
		name: 'email',
		type: String,
		required: true,
		description: 'correo electrónico del cliente',
	})
	@IsNotEmpty()
	@IsString()
	email: string;

	@ApiProperty({
		name: 'address',
		type: AddressModel,
		required: true,
		description: 'dirección del cliente',
	})
	@Type(() => AddressModel)
	@IsNotEmpty()
	address: AddressModel;
}
