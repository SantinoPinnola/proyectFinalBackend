import { isLoggedIn } from '../middlewares/auth';
import { Router } from 'express';
import { orderController } from '../controllers/ordersController';

const router = Router();

router.get('/', isLoggedIn, orderController.getOrderUser);
router.get('/:id', isLoggedIn, orderController.getOrderUser);

export default router;