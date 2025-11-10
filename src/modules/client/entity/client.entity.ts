import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { Order } from 'src/modules/order/entity/order.entity';

@Entity()
export class Client {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ type: String, nullable: false, length: 30 })
	name!: string;

	@Column({ type: String, nullable: false, unique: true, length: 30 })
	email!: string;

	@OneToOne(() => Address, {
		cascade: ['insert', 'update', 'remove'],
		eager: true,
	})
	@JoinColumn()
	address: Address;

	@OneToMany(() => Order, (order) => order.client)
	orders!: Order[];
}
