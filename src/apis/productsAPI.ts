import { newProductI, ProductI, ProductQuery } from '../interfaces/productsInterfaces';
<<<<<<< HEAD
import { FactoryDAO } from '../models/factory/productsFactory';
import { TipoPersistencia } from '../models/factory/productsFactory';
=======
import {productsLocal} from '../models/productsModels'
>>>>>>> 8a3f22bb9002e0910f2dc6b42d167d61daae6c9c


export const tipo = TipoPersistencia.LocalMongo;

class prodAPI {
  private productos;

  constructor() {
<<<<<<< HEAD
    this.productos = FactoryDAO.get(tipo);
=======
    this.productos = productsLocal;
>>>>>>> 8a3f22bb9002e0910f2dc6b42d167d61daae6c9c
  }

  async getProducts(id: string | undefined = undefined): Promise<ProductI | ProductI[]>  {
    if (id) return this.productos.get(id);

    return this.productos.get();
  }

  async addProduct(productData: newProductI): Promise<ProductI> {
    const newProduct = await this.productos.add(productData);
    return newProduct;
  }

  async updateProduct(id: string, productData: newProductI) {
    const updatedProduct = await this.productos.update(id, productData);
    return updatedProduct;
  }

  async deleteProduct(id: string) {
    await this.productos.delete(id);
  }

  async query(options: ProductQuery) {
    return await this.productos.query(options);
  }
}

export const productsAPI = new prodAPI();