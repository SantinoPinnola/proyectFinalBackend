import { CartAPI } from '../apis/cartAPI';
import { Request, Response, NextFunction } from 'express';
import { UserI } from '../interfaces/usersInterfaces';
import { productsAPI } from '../apis/productsAPI';
import { logger } from '../middlewares/logger';

class Cart {
  async getCartByUser(req: Request, res: Response) {
    const user: any = req.user;
    const cart = await CartAPI.getCart(user._id);
    res.json(cart);
  }

  async addProduct(req: Request, res: Response) {
    const user: any = req.user;
    const cart = await CartAPI.getCart(user._id);
    const { productId, productAmount } = req.body;

    if (!productId || !productAmount)
      return res.status(400).json({ msg: 'Invalid body parameters' });

      const product = await productsAPI.getProducts(productId);
    if (!product)
      return res.status(400).json({ msg: 'product not found' });

    if (parseInt(productAmount) < 0)
      return res.status(400).json({ msg: 'Invalid amount' });

      const updatedCart = await CartAPI.addProduct(
      cart._id,
      productId,
      parseInt(productAmount)
    );
    //res.redirect('/api/vista');
    res.status(201).json({
      msg: 'Producto agregado con exito',
      updatedCart : updatedCart,
    })
  }

  async deleteProduct(req: Request, res: Response) {
    const user: any = req.user;
    const cart = await CartAPI.getCart(user._id);

    const { productId, productAmount } = req.body;

    if (!productId || !productAmount)
      return res.status(400).json({ msg: 'Invalid body parameters' });

    const product = await productsAPI.getProducts(productId);
    if (!product)
      return res.status(400).json({ msg: 'product not found' });

    if (parseInt(productAmount) < 0)
      return res.status(400).json({ msg: 'Invalid amount' });

    const updatedCart = await CartAPI.deleteProduct(
      cart._id,
      productId,
      parseInt(productAmount)
    );
    res.redirect('/api/userCart');
  }
}

export const CartController = new Cart();