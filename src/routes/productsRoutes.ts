import {Router} from 'express';
import { productsController } from "../controllers/productsController";
import { checkAdmin } from '../middlewares/checkAdm';
import { Request, Response} from 'express';

const router = Router();

router.get('/', productsController.getProducts);

router.get('/:id', productsController.checkProductExists, productsController.getProducts);

router.post('/', checkAdmin,  productsController.checkAddProduct, productsController.addProducts);

router.put('/update/:id', checkAdmin, productsController.checkProductExists, productsController.updateProducts);

router.delete('/delete/:id', checkAdmin, productsController.checkProductExists, productsController.deleteProducts);


export default router;
