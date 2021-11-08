import passport, { Profile } from 'passport';
import { UserModel } from '../models/userModels';
import Config from '../config/index';
import {
  VerifyFunction,
  StrategyOption,
  Strategy as FaceBookStrategy,
} from 'passport-facebook';
import { Request, Response, NextFunction } from 'express';
import { fbClientIdArgument, fbClientSecretArgument } from '../utils/getArgs';
import { logger } from './logger';
import { EmailService } from '../services/email';


const subjectEmail = (loggedOrLogOut : boolean, profile : Profile) => {
  let stringReturn : string;
  if (loggedOrLogOut = true) {
  stringReturn = `
  Logged at: ${new Date()}/n
  Username: ${profile.name}
  `;
  } else {
  stringReturn = `
  Logged out at: ${new Date()}/n
  Username: ${profile.name}
  `;
  }

  return stringReturn;
}

const strategyOptions: StrategyOption = {
  clientID: fbClientIdArgument || Config.FACEBOOK_APP_ID,
  clientSecret: fbClientSecretArgument || Config.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:8080/api/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'emails'],
};



const loginFunc: VerifyFunction = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  logger.info('SALIO TODO BIEN');
  logger.info(accessToken);
  logger.info(refreshToken);
  logger.info(profile);
  await EmailService.sendEmail(profile.emails as any,'Logged in', subjectEmail(true,profile));
  return done(null, profile);
};

passport.use(new FaceBookStrategy(strategyOptions, loginFunc));


//passport.use('signup', new LocalStrategy(localStrategyOptions, signupFunction));

export const isLoggedIn = (req : Request, res : Response, done: (arg0: null, arg1: any) => void) => {
    if (!req.user) return res.status(401).json({ msg: 'Unathorized' });
  
    done(null, req.user);
};

interface User {
    _id? : String
}
  
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj: string, cb) {
  cb(null, obj);
});


export default passport;