# API de Órdenes de Compra - NestJS + Oracle

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Descripción

API REST para gestionar clientes, productos y órdenes de compra usando **NestJS** y **Oracle**.

## Características

- CRUD de clientes, productos y órdenes
- Persistencia en Oracle usando el paquete oracledb
- Validación de datos
- Documentación Swagger

## Tecnologías

- NestJS
- Oracle (oracledb)
- TypeScript

## Instalación y configuración

1. Clona el repositorio
2. Instala dependencias:
  ```bash
  npm install
  ```
3. Instala el driver de Oracle:
  ```bash
  npm install oracledb
  ```
4. Configura las variables de entorno en un archivo `.env`:
  ```env
  ORACLE_HOST=host
  ORACLE_PORT=port
  ORACLE_USERNAME=tu_usuario
  ORACLE_PASSWORD=tu_contraseña
  ORACLE_SID=SID
  ```


## Ejemplo de conexión

```typescript
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
```

## Ejecución

```bash
npm run start:dev
```
La API estará disponible en `http://localhost:3000`.
Documentación Swagger: `http://localhost:3000/api`

## Estructura

```
src/
  modules/
    client/
    product/
    order/
  app.module.ts
  main.ts
```

## Modelos

- Cliente: id, name, email, address, orders
- Dirección: id, country, province, town, street
- Producto: id, name, price, stock, deleted
- Orden: id, createdAt, updatedAt, confirmAt, client, products

## Endpoints principales

- `/api/v1/clients`: CRUD de clientes
- `/api/v1/products`: CRUD y gestión de productos
- `/api/v1/orders`: CRUD y gestión de órdenes

## Ejemplo de uso

```bash
POST /api/v1/clients
{
  "name": "Juan Pérez",
  "email": "juan.perez@example.com",
  "address": {
    "country": "Argentina",
    "province": "Buenos Aires",
    "town": "CABA",
    "street": "Av. Corrientes 1234"
  }
}
```

## Testing

```bash
npm run test
```

## Scripts útiles

- `npm run start:dev` - desarrollo
- `npm run build` - construir
- `npm run lint` - lint
- `npm run format` - formatear
- `npm run test` - tests

## Notas

- Validaciones y relaciones implementadas en los módulos
- Soft delete para productos
- Documentación Swagger incluida

## Contribuir

¡Las contribuciones son bienvenidas!

## Licencia

Uso educativo.
