import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entity/client.entity';
import { ClientModel } from './model/client.model';
import { Address } from './entity/address.entity';

@Injectable()
export class ClientService {
	constructor(
		@InjectRepository(Client) private clientsRepository: Repository<Client>,
		@InjectRepository(Address)
		private addressesRepository: Repository<Address>,
	) {}

	async findClient(client: ClientModel) {
		return await this.clientsRepository.findOne({
			where: {
				id: client.id,
				email: client.email,
			},
		});
	}

	async createClient(client: ClientModel) {
		const clientExists = await this.findClient(client);
		if (clientExists) {
			if (client.id) {
				throw new ConflictException(
					`El cliente con id ${client.id} ya existe`,
				);
			} else if (client.email) {
				throw new ConflictException(
					`El cliente con email ${client.email} ya existe`,
				);
			}
		}

		let addressExists: Address | null = null;
		if (client.address.id) {
			addressExists = await this.addressesRepository.findOne({
				where: {
					id: client.address.id,
				},
			});
		} else {
			addressExists = await this.addressesRepository.findOne({
				where: {
					country: client.address.country,
					province: client.address.province,
					town: client.address.town,
					street: client.address.street,
				},
			});
		}

		if (addressExists) {
			throw new ConflictException(`La dirección ya existe`);
		}

		return await this.clientsRepository.save(client);
	}

	async getClients() {
		return await this.clientsRepository.find();
	}

	async getClientById(id: number) {
		return await this.clientsRepository.findOne({
			where: { id: id },
		});
	}

	async getClientByEmail(email: string) {
		return await this.clientsRepository.findOne({
			where: { email: email },
		});
	}

	async updateClient(client: ClientModel) {
		if (!client.id) {
			return await this.createClient(client);
		}

		let clientExists: Client | null = await this.getClientByEmail(
			client.email,
		);
		if (clientExists && clientExists.id !== client.id) {
			throw new ConflictException(
				`El cliente con email ${client.email} ya existe`,
			);
		}

		let addressExists: Address | null = null;
		let deleteAddress = false;

		clientExists = await this.getClientById(client.id);

		if (client.address.id) {
			addressExists = await this.addressesRepository.findOne({
				where: {
					id: client.address.id,
				},
			});

			if (
				addressExists &&
				addressExists.id !== clientExists?.address.id
			) {
				throw new ConflictException(`La dirección ya existe`);
			} else if (
				JSON.stringify(addressExists) !==
				JSON.stringify(client?.address)
			) {
				addressExists = await this.addressesRepository.findOne({
					where: {
						country: client.address.country,
						province: client.address.province,
						town: client.address.town,
						street: client.address.street,
					},
				});

				if (addressExists) {
					throw new ConflictException(`La dirección ya existe`);
				} else {
					deleteAddress = true;
				}
			}
		} else {
			addressExists = await this.addressesRepository.findOne({
				where: {
					country: client.address.country,
					province: client.address.province,
					town: client.address.town,
					street: client.address.street,
				},
			});

			if (addressExists) {
				throw new ConflictException(`La dirección ya existe`);
			} else {
				deleteAddress = true;
			}
		}

		const updatedClient = await this.clientsRepository.save(client);

		if (deleteAddress) {
			await this.addressesRepository.delete({
				id: clientExists?.address.id,
			});
		}

		return updatedClient;
	}

	async deleteClient(id: number) {
		const clientExists = await this.getClientById(id);
		if (!clientExists) {
			throw new ConflictException(`El cliente con id ${id} no existe`);
		}

		const rows = await this.clientsRepository.delete({ id: id });

		if (rows.affected === 1) {
			await this.addressesRepository.delete({
				id: clientExists.address.id,
			});
			return true;
		}

		return false;
	}
}
