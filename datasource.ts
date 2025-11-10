import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
	type: 'oracle',
	host: '127.0.0.1',
	port: 1521,
	username: 'C##SHOP',
	password: '123456',
	sid: 'xe',
	synchronize: true,
	entities: ['dist/**/*.entity{.ts,.js}'],
});

export default AppDataSource;
