import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { ProductModel } from './model/product.model';
import { UpdateResult } from 'typeorm/browser';
import { StockModel } from './model/stock.model';

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(Product)
		private productRepository: Repository<Product>,
	) {}

	private MAX_STOCK: number = 1000;
	private MIN_STOCK: number = 0;

	async createProduct(product: ProductModel) {
		const productExists = await this.getProductById(product.id);

		if (productExists) {
			throw new ConflictException(
				`Producto con el id ${product.id} ya existe.`,
			);
		}

		return this.productRepository.save(product);
	}

	async getProductById(id?: number) {
		return await this.productRepository.findOne({ where: { id } });
	}

	async getProducts() {
		return await this.productRepository.find({ where: { deleted: false } });
	}

	async getDeletedProducts() {
		return await this.productRepository.find({ where: { deleted: true } });
	}

	async updateProduct(product: ProductModel) {
		return this.productRepository.save(product);
	}

	async deleteProduct(id: number) {
		const product = await this.getProductById(id);
		if (!product) {
			throw new ConflictException(`Producto con el id ${id} no existe.`);
		}
		if (product.deleted) {
			throw new ConflictException(
				`Producto con el id ${id} ya fue eliminado.`,
			);
		}
		const rows: UpdateResult = await this.productRepository.update(
			{ id },
			{ deleted: true },
		);
		return rows.affected == 1;
	}

	async restoreProduct(id: number) {
		const product = await this.getProductById(id);
		if (!product) {
			throw new ConflictException(`Producto con el id ${id} no existe.`);
		}
		if (!product.deleted) {
			throw new ConflictException(
				`Producto con el id ${id} no está eliminado.`,
			);
		}
		const rows: UpdateResult = await this.productRepository.update(
			{ id },
			{ deleted: false },
		);
		return rows.affected == 1;
	}

	async updateStock(stock: StockModel) {
		const product = await this.getProductById(stock.id);
		if (!product) {
			throw new ConflictException(
				`Producto con el id ${stock.id} no existe.`,
			);
		}

		if (product.deleted) {
			throw new ConflictException(
				`Producto con el id ${stock.id} está eliminado.`,
			);
		}

		const rows: UpdateResult = await this.productRepository.update(
			{ id: stock.id },
			{ stock: stock.stock },
		);
		return rows.affected == 1;
	}

	async incrementStock(stock: StockModel) {
		const product = await this.getProductById(stock.id);
		if (!product) {
			throw new ConflictException(
				`Producto con el id ${stock.id} no existe.`,
			);
		}

		if (product.deleted) {
			throw new ConflictException(
				`Producto con el id ${stock.id} está eliminado.`,
			);
		}

		let productStock = 0;

		if (product.stock + stock.stock > this.MAX_STOCK) {
			productStock = this.MAX_STOCK;
		} else {
			productStock = product.stock + stock.stock;
		}

		const rows: UpdateResult = await this.productRepository.update(
			{ id: stock.id },
			{ stock: productStock },
		);
		return rows.affected == 1;
	}

	async decrementStock(stock: StockModel) {
		const product = await this.getProductById(stock.id);
		if (!product) {
			throw new ConflictException(
				`Producto con el id ${stock.id} no existe.`,
			);
		}

		if (product.deleted) {
			throw new ConflictException(
				`Producto con el id ${stock.id} está eliminado.`,
			);
		}

		let productStock = 0;

		if (product.stock - stock.stock < this.MIN_STOCK) {
			productStock = this.MIN_STOCK;
		} else {
			productStock = product.stock - stock.stock;
		}

		const rows: UpdateResult = await this.productRepository.update(
			{ id: stock.id },
			{ stock: productStock },
		);
		return rows.affected == 1;
	}
}
