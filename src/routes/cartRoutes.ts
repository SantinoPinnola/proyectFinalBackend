import { Router } from 'express';
import { CartController } from '../controllers/cartController';
import { isLoggedIn } from '../middlewares/auth';
const router = Router();

router.get('/', CartController.getCartByUser);

router.post('/add', CartController.addProduct);

router.post('/delete', CartController.deleteProduct);

// Crean documento orders
// Sacan snapshot del carrito tal como esta y lo agregan a la orden
//le ponen en la orden info del usuario
// Vacian carrito
//Mandan mensajitos


export default router; 