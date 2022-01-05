import { Router } from 'express';
import { Request, Response} from 'express';
import { isLoggedIn } from '../middlewares/auth';


const router = Router();

router.get('/', isLoggedIn, (req: Request, res: Response) => {
    res.render('chat');
})

export default router;