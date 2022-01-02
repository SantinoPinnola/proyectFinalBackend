import { newProductI, ProductI, ProductQuery } from '../interfaces/productsInterfaces';
import { FactoryDAO } from '../models/factory/productsFactory';
import { TipoPersistencia } from '../models/factory/productsFactory';
import config from '../config';



class prodAPI {
  private tipo;
  private productos;

  constructor() {
    if (config.NODE_ENV == 'development') {
      this.tipo = TipoPersistencia.Memoria;
      this.productos = FactoryDAO.get(this.tipo);
    } else if (config.NODE_ENV == 'production') {
       this.tipo = TipoPersistencia.LocalMongo;
       this.productos = FactoryDAO.get(this.tipo);
    }
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