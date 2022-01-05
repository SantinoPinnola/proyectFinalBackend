import { Router } from 'express';
import { imgController } from '../controllers/imagesController';
import { isLoggedIn } from '../middlewares/auth';
import { checkAdmin } from '../middlewares/checkAdm';
const router = Router();

router.get('/get/:id',imgController.getImage);
router.post('/upload/:id',imgController.uploadImage);
router.delete('/delete/:id',imgController.deleteImage);


export default router;