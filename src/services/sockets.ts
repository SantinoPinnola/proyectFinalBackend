import { mensajes } from "../models/messagesModels";
import { Server } from "socket.io";
import config from "../config";
import { isLoggedIn } from "../middlewares/auth";
import { middlewareSession } from "./server";
import passport from "../middlewares/auth";




export const initWsServer = (app : any) => {
    const myWSServer = new Server(app);

    const wrap = (middleware : any) => (socket : any, next : any) => middleware(socket.request, {}, next);

    myWSServer.use(wrap(passport.initialize()));
    myWSServer.use(wrap(passport.session()));


    myWSServer.use((socket: any, next) => {
		if (socket.request.user) {
			next();
		} else {
			next(new Error('not logged'));
		}
	});
    
    myWSServer.on('connection', function (socket : any) {
        console.log('\n\nUn cliente se ha conectado');
        console.log(`ID DEL SOCKET DEL CLIENTE => ${socket.client.id}`);
        console.log(`ID DEL SOCKET DEL SERVER => ${socket.request.user._id}`);

        socket.on('askData', async () => {
            console.log('ME LLEGO DATA');
            const messages = await mensajes.find().lean();
            if (messages.length > 0) {
                socket.emit('messages', messages);
            }
        });

        socket.on('new-message', async (data : any) => {
            const newMsg = await mensajes.create(data);
            myWSServer.emit('messages', [newMsg]);
          });
        
    })

    
    
    return myWSServer;
}

