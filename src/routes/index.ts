import {Router} from 'express';
import productsRouter from './productsRoutes';
import cartRouter from './cartRoutes';
import imageRouter from './imageRoutes'
import UserRouter from './userRoutes'
import { isLoggedIn } from '../middlewares/auth';


const router = Router();

router.use('/products', productsRouter);
router.use('/cart', cartRouter);
router.use('/', UserRouter);
router.use('/images', imageRouter);


export default router;