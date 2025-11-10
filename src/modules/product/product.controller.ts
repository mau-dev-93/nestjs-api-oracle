import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Put,
} from '@nestjs/common';
import {
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductModel } from './model/product.model';
import { StockModel } from './model/stock.model';

@Controller('api/v1/products')
@ApiTags('products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post()
	@ApiOperation({ description: 'Crea un nuevo producto' })
	@ApiResponse({
		status: 201,
		description: 'Producto creado correctamente',
	})
	@ApiResponse({
		status: 409,
		description: 'Conflicto al crear el producto',
	})
	@ApiBody({
		description: 'Crea un producto mediante un ProductModel',
		type: ProductModel,
		examples: {
			ejemplo1: {
				value: {
					id: 3,
					name: 'Producto 3',
					price: 30,
					stock: 10,
					deleted: false,
				},
			},
		},
	})
	async createProduct(@Body() product: ProductModel) {
		return await this.productService.createProduct(product);
	}

	@Get('/deleted')
	@ApiOperation({ description: 'Obtiene todos los productos eliminados' })
	@ApiResponse({
		status: 200,
		description: 'Productos eliminados obtenidos correctamente',
	})
	async getDeletedProducts() {
		return await this.productService.getDeletedProducts();
	}

	@Get('/:id')
	@ApiOperation({ description: 'Obtiene un producto por su ID' })
	@ApiParam({
		name: 'id',
		type: Number,
		required: true,
		description: 'ID del producto',
	})
	@ApiResponse({
		status: 200,
		description: 'Producto obtenido correctamente',
	})
	async getProductById(@Param('id') id: number) {
		return await this.productService.getProductById(id);
	}

	@Get()
	@ApiOperation({ description: 'Obtiene todos los productos activos' })
	@ApiResponse({
		status: 200,
		description: 'Productos activos obtenidos correctamente',
	})
	async getProducts() {
		return await this.productService.getProducts();
	}

	@Put('/:id')
	@ApiOperation({ description: 'Actualiza un producto por su ID' })
	@ApiParam({
		name: 'id',
		type: Number,
		required: true,
		description: 'ID del producto',
	})
	@ApiResponse({
		status: 200,
		description: 'Producto actualizado correctamente',
	})
	@ApiResponse({
		status: 409,
		description: 'Conflicto al actualizar el producto',
	})
	async updateProduct(
		@Param('id') id: number,
		@Body() product: ProductModel,
	) {
		product.id = id;
		return await this.productService.updateProduct(product);
	}

	@Delete('/:id')
	@ApiOperation({ description: 'Elimina un producto por su ID' })
	@ApiParam({
		name: 'id',
		type: Number,
		required: true,
		description: 'ID del producto',
	})
	@ApiResponse({
		status: 200,
		description: 'Producto eliminado correctamente',
	})
	@ApiResponse({
		status: 409,
		description:
			'Conflicto al eliminar el producto: No existe o ya fue eliminado',
	})
	async deleteProduct(@Param('id') id: number) {
		return await this.productService.deleteProduct(id);
	}

	@Patch('/stock')
	@ApiOperation({ description: 'Actualiza el stock de un producto' })
	@ApiBody({
		description: 'Datos del stock producto con StockModel',
		type: StockModel,
		examples: {
			ejemplo1: {
				value: {
					id: 2,
					stock: 3,
				},
			},
		},
	})
	@ApiResponse({
		status: 200,
		description: 'Producto eliminado correctamente',
	})
	@ApiResponse({
		status: 409,
		description:
			'Conflicto al actualizar stock del producto: El producto no existe o fue eliminado',
	})
	async updateStock(@Body() stock: StockModel) {
		return await this.productService.updateStock(stock);
	}

	@Patch('/stock/increment')
	@ApiOperation({ description: 'Incrementa el stock de un producto' })
	@ApiBody({
		description: 'Incrementa el stock de un producto con StockModel',
		type: StockModel,
		examples: {
			ejemplo1: {
				value: {
					id: 2,
					stock: 3,
				},
			},
		},
	})
	@ApiResponse({
		status: 200,
		description: 'Stock incrementado correctamente',
	})
	@ApiResponse({
		status: 409,
		description:
			'Conflicto al incrementar stock: El producto no existe o fue eliminado',
	})
	async incrementStock(@Body() stock: StockModel) {
		return await this.productService.incrementStock(stock);
	}

	@Patch('/stock/decrement')
	@ApiOperation({ description: 'Decrementa el stock de un producto' })
	@ApiBody({
		description: 'Decrementa el stock de un producto con StockModel',
		type: StockModel,
		examples: {
			ejemplo1: {
				value: {
					id: 2,
					stock: 3,
				},
			},
		},
	})
	@ApiResponse({
		status: 200,
		description: 'Stock decrementado correctamente',
	})
	@ApiResponse({
		status: 409,
		description:
			'Conflicto al decrementar stock: El producto no existe o fue eliminado',
	})
	async decrementStock(@Body() stock: StockModel) {
		return await this.productService.decrementStock(stock);
	}

	@Patch('/:id')
	@ApiOperation({ description: 'Restaura un producto eliminado por su ID' })
	@ApiParam({
		name: 'id',
		type: Number,
		required: true,
		description: 'ID del producto',
	})
	@ApiResponse({
		status: 200,
		description: 'Producto restaurado correctamente',
	})
	@ApiResponse({
		status: 409,
		description:
			'Conflicto al restaurar producto: El producto no existe o fue eliminado',
	})
	async restoreProduct(@Param('id') id: number) {
		return await this.productService.restoreProduct(id);
	}
}
