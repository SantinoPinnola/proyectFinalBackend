import {Router} from 'express';
import { Request, Response } from 'express';
import { UserModel } from '../models/userModels';
import passport from '../middlewares/auth';
import { EmailService } from '../services/gmail';
import { Photos, Emails, User } from './productsRoutes';
import { EtherealService } from '../services/etherealmail';

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

router.post('/logout', (req: Request, res: Response) => {
    let foto = 'noPhoto';
    let email = 'noEmail';
  
   
    const userData : User = req.user as User;
  
    if (userData.photos) foto = userData.photos[0].value;
  
    if (userData.emails) email = userData.emails[0].value;
    req.session.destroy((err) => {
        res.redirect('/api');
        EmailService.sendEmail(email,'Logged Out',subjectEmail(false, userData.displayName as string))
        EtherealService.sendEmail(email,'Logged Out',subjectEmail(false, userData.displayName as string))
    });
})


router.get(
    '/auth/facebook',
    passport.authenticate('facebook', { scope: ['email'] })
);

router.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/api/products',
      failureRedirect: '/api/fail',
    })
);


export default router;
