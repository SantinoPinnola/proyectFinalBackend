import {Router} from 'express';
import { Request, Response } from 'express';
import { UsersAtlas } from '../models/userModels';
import passport from '../middlewares/auth';


function subjectEmail(loggedOrLogOut: boolean, displayName : string)  {
    let stringReturn: string;
    if (loggedOrLogOut = true) {
      stringReturn = `
    Logged at: ${new Date()}/n
    Username: ${displayName}
    `;
    } else {
      stringReturn = `
    Logged out at: ${new Date()}/n
    Username: ${displayName}
    `;
    }
  
    return stringReturn;
}

const router = Router();


router.get('/', async (req, res) => {
    res.render('loginForm');
});

router.post('/signup', (req, res, next) => {
    passport.authenticate('signup', function (err, user, info) {
      console.log(err, user, info);
      if (err) {
        return next(err);
      }
      if (!user) return res.status(401).json({ data: info });
  
      res.render('main', { username : req.body.username})
    })(req, res, next);
});

router.get('/signUpPage', (req: Request, res: Response) => {
    res.render('signup');
})

router.post('/login', passport.authenticate('login'), (req : Request, res : Response) => {
    res.render('main', {nombre : req.body.username});
});


export default router;
