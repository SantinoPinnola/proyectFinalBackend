import { Router } from 'express';
import { CartController } from '../controllers/cartController';
import { isLoggedIn } from '../middlewares/auth';
const router = Router();

router.get('/',isLoggedIn,  CartController.getCartByUser);

router.post('/add', isLoggedIn, CartController.addProduct);

router.post('/delete', isLoggedIn, CartController.deleteProduct);


export default router; 