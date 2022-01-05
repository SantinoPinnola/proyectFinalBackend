import { Router } from 'express';
import { imgController } from '../controllers/imagesController';
import { isLoggedIn } from '../middlewares/auth';
import { checkAdmin } from '../middlewares/checkAdm';
const router = Router();


router.post('/upload/:id',imgController.uploadImage);


export default router;