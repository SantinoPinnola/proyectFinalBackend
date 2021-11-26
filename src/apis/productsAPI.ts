import { newProductI, ProductI, ProductQuery } from '../interfaces/productsInterfaces';
import { FactoryDAO } from '../models/factory/productsFactory';
import { TipoPersistencia } from '../models/factory/productsFactory';


export const tipo = TipoPersistencia.LocalMongo;

class prodAPI {
  private productos;

  constructor() {
    this.productos = FactoryDAO.get(tipo);
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