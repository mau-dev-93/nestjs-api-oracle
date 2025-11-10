import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { Address } from './entity/address.entity';
import { Client } from './entity/client.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Client, Address])],
	controllers: [ClientController],
	providers: [ClientService],
	exports: [ClientService],
})
export class ClientModule {}
