import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientModel } from './model/client.model';
import {
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';

@Controller('api/v1/clients')
@ApiTags('clientes')
export class ClientController {
	constructor(private readonly clientService: ClientService) {}

	@Post()
	@ApiOperation({
		description: 'Crear un nuevo cliente',
	})
	@ApiBody({
		description: 'Datos del cliente a crear',
		type: ClientModel,
		examples: {
			ejemplo1: {
				value: {
					name: 'Juan Perez',
					email: 'juan.perez@example.com',
					address: {
						country: 'Argentina',
						province: 'Buenos Aires',
						town: 'Ciudad Real 321',
						street: 'calle Falsa 123',
					},
				},
			},
			ejemplo2: {
				value: {
					name: 'Rocio Gomez',
					email: 'rocio.gomez@example.com',
					address: {
						country: 'México',
						province: 'Nuevo León',
						town: 'Monterrey',
						street: 'Matamoros 128',
					},
				},
			},
		},
	})
	@ApiResponse({
		status: 201,
		description: 'Cliente creado exitosamente',
	})
	@ApiResponse({
		status: 409,
		description: 'El cliente ya existe. <br/> La dirección ya existe.',
	})
	async createClient(@Body() client: ClientModel) {
		return await this.clientService.createClient(client);
	}

	@Get()
	@ApiOperation({
		description:
			'Devuelve una lista de todos los clientes y sus direcciones',
	})
	@ApiResponse({
		status: 200,
		description: 'Lista de clientes obtenida exitosamente',
	})
	async getClients() {
		return await this.clientService.getClients();
	}

	@Get('/:id')
	@ApiOperation({
		description: 'Devuelve un cliente por su ID junto con su dirección',
	})
	@ApiParam({
		name: 'id',
		type: Number,
		required: true,
		description: 'ID del cliente a obtener',
	})
	@ApiResponse({
		status: 200,
		description: 'Cliente obtenido exitosamente',
	})
	async getClientById(@Param('id') id: number) {
		return await this.clientService.getClientById(id);
	}

	@Put('/:id')
	@ApiOperation({
		description: 'Actualiza un cliente existente por su ID',
	})
	@ApiParam({
		name: 'id',
		type: Number,
		required: true,
		description: 'ID del cliente a actualizar',
	})
	@ApiBody({
		description: 'Datos del cliente a actualizar',
		type: ClientModel,
		examples: {
			ejemplo1: {
				value: {
					id: 1,
					name: 'Fernando Manuel',
					email: 'juan.perez@example.com',
					address: {
						id: 4,
						country: 'Argentina',
						province: 'Buenos Aires',
						town: 'Ciudad Real 321',
						street: 'calle Falsa 123',
					},
				},
			},
			ejemplo2: {
				value: {
					id: 1,
					name: 'Abigail Lucia',
					email: 'juan.perez@example.com',
					address: {
						id: 4,
						country: 'Argentina',
						province: 'Buenos Aires',
						town: 'Ciudad Real 321',
						street: 'calle Falsa 123',
					},
				},
			},
		},
	})
	@ApiResponse({
		status: 200,
		description: 'Cliente actualizado exitosamente',
	})
	@ApiResponse({
		status: 409,
		description: 'El cliente ya existe. <br/> La dirección ya existe.',
	})
	async updateClient(@Param('id') id: number, @Body() client: ClientModel) {
		client.id = id;
		return await this.clientService.updateClient(client);
	}

	@Delete('/:id')
	@ApiOperation({
		description: 'Elimina un cliente existente por su ID',
	})
	@ApiParam({
		name: 'id',
		type: Number,
		required: true,
		description: 'ID del cliente a eliminar',
	})
	@ApiResponse({
		status: 200,
		description: 'Cliente y su dirección eliminados exitosamente',
	})
	async deleteClient(@Param('id') id: number) {
		return await this.clientService.deleteClient(id);
	}
}
