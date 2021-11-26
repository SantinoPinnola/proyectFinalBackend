import express from 'express';
import path from 'path';
import * as http from 'http';
import apiRouter from '../routes/index';
import handlebars from 'express-handlebars';
import session from 'express-session';
import { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import { graphqlHTTP } from 'express-graphql';
import { graphQLMainSchema } from './graphql';
import {axiosDelete, axiosGet, axiosGetID, axiosPost, axiosUpdate}  from '../services/axios';
//import multer from 'multer';



const StoreOptions = {
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/coderhouse'
    }),
    secret: 'asdasasdasfas',
    resave: false,
    saveUninitialized: false,
    cookie : {
        maxAge : 600000
    }
};



const app = express ();


const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));


//const upload = multer({ dest: '../public/images/' });

//app.post('/single', upload.single('imagen'), (req : Request, res : Response) => {
 // if(req.file) {
 //   console.log(req.file);
 //   res.send(req.file);
 // } else {
  //  res.send(400)
//  }
//});

const layoutsFolderPath = path.resolve(__dirname, '../../views/layouts')
const defaultLayerPth = path.resolve(__dirname, '../../views/layouts/index.hbs');
const partialsFolderPath = path.resolve(__dirname, '../../views/partials');


app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    extname: 'hbs',
    layoutsDir : layoutsFolderPath,
    partialsDir : partialsFolderPath ,
    defaultLayout : defaultLayerPth
}));


app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQLMainSchema,
    graphiql: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(cookieParser());
app.use(session (StoreOptions));

app.use(passport.initialize());
app.use(passport.session());


app.use('/api', apiRouter)



const myServer = new http.Server(app);

export default myServer;