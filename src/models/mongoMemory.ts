import moment from 'moment';
import { newProductI, ProductI, ProductQuery } from '../interfaces/productsInterfaces';
import { productosMockMem } from '../mocks/products-mem'

let productos = productosMockMem;

export class ProductosModel {
  async get(id?: string): Promise<ProductI | ProductI[]> {
    try {
      if (id) return productos.find((item: ProductI) => item._id === id) as ProductI;
      return productos;
    } catch (e) {
      throw { error: e, message: 'Hubo un problema al cargar el producto' };
    }
  }

  async save(producto: ProductI): Promise<ProductI> {
    try {
      productos.push(producto);
      return producto;
    } catch (e) {
      throw { error: e, message: 'No se pudo guardar el producto' };
    }
  }

  async update(id: string, producto: ProductI): Promise<ProductI> {
    try {
      let productToUpdate = productos.find((item: ProductI) => item._id === id);

      if (productToUpdate) {
        productToUpdate = {
          ...productToUpdate,
          ...producto,
        };

        const productToUpdateIndex = productos
          .map((item: ProductI) => item._id)
          .indexOf(id);
        productos.splice(productToUpdateIndex, 1, productToUpdate);

        return productToUpdate;
      } else {
        throw new Error('El producto que desea actualizar no existe');
      }
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      } else {
        throw { error: e, message: 'No se pudo actualizar el producto' };
      }
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const productToDelete = productos.find((item: ProductI) => item._id === id);

      if (productToDelete) {
        const newProductList = productos.filter(
          (item: ProductI) => item._id !== id,
        );
        productos = newProductList;
      } else {
        throw new Error('El producto que desea eliminar no existe');
      }
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      } else {
        throw { error: e, message: 'No se pudo actualizar el producto' };
      }
    }
  }

  async query(options: ProductQuery): Promise<ProductI[]> {
    const productos = await this.get();
    type Conditions = (aProduct: ProductI) => boolean;
    const query: Conditions[] = [];

    if (options.nombre)
      query.push((aProduct: ProductI) => aProduct.name == options.nombre);

    if (options.precio)
      query.push(
        (aProduct: ProductI) => aProduct.price == (options.precio as number),
      );

    return (productos as ProductI[]).filter(aProduct =>
      query.every(condition => condition(aProduct)),
    );
  }
}