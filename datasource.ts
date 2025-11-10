
import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
	type: 'oracle',
	host: process.env.ORACLE_HOST,
	port: Number(process.env.ORACLE_PORT),
	username: process.env.ORACLE_USERNAME,
	password: process.env.ORACLE_PASSWORD,
	sid: process.env.ORACLE_SID,
	synchronize: true,
	entities: ['dist/**/*.entity{.ts,.js}'],
});

export default AppDataSource;
