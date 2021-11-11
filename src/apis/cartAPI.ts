import { CartsAtlas } from '../models/cartModels';
import { CartI } from '../interfaces/cartInterfaces';
import { UserAPI } from './userAPI';
import { productsAPI } from './productsAPI'
import { logger } from '../middlewares/logger';

class Cart {
  private carts;

  constructor() {
    this.carts = new CartsAtlas()
  }

  async getCart(userId: string): Promise<any> {
    return this.carts.get(userId);
  }

  async createCart(userId: string): Promise<CartI> {
    const user = await UserAPI.getUsers(userId);

    if (!user.length)
      throw new Error('User does not exist. Error creating cart');

    const newCart = await this.carts.createCart(userId);
    return newCart;
  }

  async addProduct(
    cartId: string,
    productId: string,
    amount: number
  ): Promise<CartI> {
    const product = await productsAPI.getProducts(productId);
    const addProduct = {
      _id: productId,
      name: product.name,
      price: product.price,
      amount,
    };
    logger.error(addProduct)
    const updatedCart = await this.carts.addProduct(cartId, addProduct);
    return updatedCart;
  }

  async deleteProduct(cartId: string, productId: string, amount: number) {
    const product = await productsAPI.getProducts(productId);
    const deleteProduct = {
      _id: productId,
      name: product.name,
      price: product.price,
      amount,
    };

    const updatedCart = await this.carts.deleteProduct(cartId, deleteProduct);
    return updatedCart;
  }

  async deleteAllProducts (cartId : string) {
    await this.carts.deleteAllProducts(cartId);
  }
}

export const CartAPI = new Cart();