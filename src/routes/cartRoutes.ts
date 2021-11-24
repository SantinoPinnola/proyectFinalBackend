import { Router } from 'express';
import { CartController } from '../controllers/cartController';
import { isLoggedIn } from '../middlewares/auth';
const router = Router();

router.get('/', CartController.getCartByUser);

router.post('/add', CartController.addProduct);

router.post('/delete', CartController.deleteProduct);


export default router; 