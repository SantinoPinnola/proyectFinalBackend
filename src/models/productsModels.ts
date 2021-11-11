import mongoose from "mongoose";
import {
  newProductI,
  ProductI,
  ProductBaseClass,
  ProductQuery,
} from '../interfaces/productsInterfaces';

const productsCollection = 'products';

const ProductsSchema = new mongoose.Schema({
    name : {type : String, require : true, max : 50},
    price : {type : Number, require : true},
    description : {type : String, require : true, max : 240} ,
    thumbnail : {type : String, require : true, max : 64},
    stock : {type : Number, require : true},
    timestamp : {type : Date, default : Date.now()}
});

export class ProductosAtlas implements ProductBaseClass {

  private productos;

  constructor(local: boolean = false) {
    this.productos = mongoose.model<ProductI>('producto', ProductsSchema);
  }

  async get(id?: string): Promise<ProductI[]> {
    let output: ProductI[] = [];
    try {
      if (id) {
        const document = await this.productos.findById(id);
        if (document) output.push(document);
      } else {
        output = await this.productos.find();
      }

      return output;
    } catch (err) {
      return output;
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