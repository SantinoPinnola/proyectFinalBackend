import {Router} from 'express';
import { Request, Response } from 'express';
import passport from '../middlewares/auth';
import { isLoggedIn } from '../middlewares/auth';
import { productsAPI } from '../apis/productsAPI';
import {logger} from '../middlewares/logger';
import { CartAPI } from '../apis/cartAPI';
import { ProductCart } from '../interfaces/cartInterfaces';
import {EmailService} from '../services/gmail';
import config from '../config';
import { WhatsappService } from '../services/twilioWhatsapp';
import { SmsService } from '../services/twilio';
import { UserAPI } from '../apis/userAPI';
const router = Router();


router.get('/', async (req, res) => {
  if (req.isAuthenticated()) { 
    res.redirect('/api/vista');
  }
    res.render('loginForm');
});

router.post('/signup', (req, res, next) => {
    passport.authenticate('signup', function (err, user, info) {
      console.log(err, user, info);
      if (err) {
        return next(err);
      }
      if (!user) return res.status(401).json({ data: info });
  
      res.redirect('/api')
    })(req, res, next);
});

router.get('/signUpPage', (req: Request, res: Response) => {
    res.render('signup');
})

router.post('/login', passport.authenticate('login'), (req : Request, res : Response) => {
    res.redirect('/api/vista');
});


router.get('/vista', isLoggedIn,  async (req : Request, res: Response) => {
  const result = await productsAPI.getProducts();
  const user : any = req.user;
  const userObject = {
    username : user.username,
    email : user.email,
  }
  res.render('main', {
    user : userObject,
    products : result
  })
})

router.post('/logout', (req: Request, res: Response) => {
  req.session.destroy((err: any) => {
      res.redirect('/api');
  });
})

router.get('/userCart', async (req: Request, res : Response) => {
  const user : any = req.user;
  const userId = user._id;
  const cart = await CartAPI.getCart(userId);
  let array : Array<any> = [];
  await cart.products.forEach( async (element: { _id: string | undefined; amount:number }) => {
    const result = await productsAPI.getProducts(element._id);
    const order = {
      result,
      amount : element.amount
    }
    array.push(order);
  });
  
  res.render('cartView', {
    products : array
  })
})


router.get('/datos', (req : Request, res : Response) => {
  const user : any = req.user;
  const userObject = {
    username : user.username,
    email : user.email,
    firstName : user.firstName,
    lastName : user.lastName,
    address : user.address,
    phonenumber : user.phonenumber,
    age : user.age,
  }
  res.render('datos', { user : userObject} );
})

router.post('/update', async (req : Request, res: Response) => {
  const {data} = req.body
  const user : any = req.user
  await UserAPI.updateUser(user._id, data);
  res.redirect('/api/vista');
})


router.get('/submit', async (req : Request, res : Response ) => {
  const user : any = req.user;
  const userId = user._id;
  const cart = await CartAPI.getCart(userId);

  let array : Array<any> = await Promise.all(cart.products.map(async (element : any) => {
    const result = await productsAPI.getProducts(element._id);
    logger.info(result);
    const order = {
      result,
      amount : element.amount
    }
    return order;
  }));

  const  orderComplete = {
    username : user.username,
    email : user.email,
    order : array 
  };

  let stringOrder = '';
  for(let index = 0; index < array.length; index++) {
    stringOrder = stringOrder + `Product: ${array[index].result.name}<br>
    Price: ${array[index].result.price}<br>
    Amount : ${array[index].amount}<br>
    ==============================<br>
    Username : ${user.username}<br>
    Email : ${user.email}`;
  }
  
  const response = await WhatsappService.sendMessage(`+${user.phonenumber}`,stringOrder);
  logger.info(response);
  await EmailService.sendEmail(config.GMAIL_EMAIL, `Nuevo pedido de ${orderComplete.username}`, stringOrder);
  await CartAPI.deleteAllProducts(cart._id);
  await SmsService.sendMessage(`+${user.phonenumber}`,'Tu pedido fue registrado y esta siendo preparado.');
  res.redirect('/api/vista');

});

export default router;
