import mongoose from "mongoose";
import {
  newProductI,
  ProductI,
  ProductBaseClass,
  ProductQuery,
} from '../interfaces/productsInterfaces';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const productsCollection = 'products';

const ProductsSchema = new mongoose.Schema({
    name : {type : String, require : true, max : 50},
    price : {type : Number, require : true},
    description : {type : String, require : true, max : 240} ,
    thumbnail : {type : String, require : true, max : 64},
    stock : {type : Number, require : true},
    timestamp : {type : Date, default : Date.now()}
});

class ProductosAtlas implements ProductBaseClass {

  public productos;
  public productsGraphQL : any;

  constructor() {
    this.productos = mongoose.model<ProductI>('producto', ProductsSchema);
    this.productsGraphQL = composeWithMongoose(this.productos);
  }

  async get(id?: string) {
    try {
      if (id) {
        const document = await this.productos.findById(id).lean();
        if (document) return document;
      } else {
        return this.productos.find({}).lean();
      }
    }catch (error) {
        let msg = (error as Error).message;
      }
  }

  async add(data: newProductI): Promise<ProductI> {
    if (!data.name || !data.price || !data.description || !data.thumbnail) throw new Error('invalid data');

    const newProduct = new this.productos(data);
    await newProduct.save();

    return newProduct;
  }

  async update(id: string, newProductData: newProductI): Promise<ProductI> {
    const productUpdated = this.productos.findByIdAndUpdate(id,newProductData);

    return productUpdated as unknown as Promise<ProductI>;
  }

  async delete(id: string) {
    await this.productos.findByIdAndDelete(id);
  }

  async query(options: ProductQuery): Promise<ProductI[]> {
    let query: ProductQuery = {};

    if (options.nombre) query.nombre = options.nombre;

    if (options.precio) query.precio = options.precio;

    return this.productos.find(query);
  }
}

export const productsLocal = new ProductosAtlas();
