import { mensajes } from "../models/messagesModels";
import { Server } from "socket.io";
import { SmsService } from "./twilio";
import config from "../config";




export const initWsServer = (app : any) => {
    const myWSServer = new Server(app);


    myWSServer.on('connection', function (socket : any) {
        console.log('\n\nUn cliente se ha conectado');
        console.log(`ID DEL SOCKET DEL CLIENTE => ${socket.client.id}`);
        console.log(`ID DEL SOCKET DEL SERVER => ${socket.id}`);

        socket.on('askData', async () => {
            console.log('ME LLEGO DATA');
            const messages = await mensajes.find().lean();
            if (messages.length > 0) {
                socket.emit('messages', messages);
            }
        });

        socket.on('new-message', async (data : any) => {
            if (data.msg.includes('administrador')) {
                SmsService.sendMessage(config.TEST_PHONENUMBER,`
                Message sended by: ${data.email}/n
                Content: ${data.msg}`);
            }
            const newMsg = await mensajes.create(data);
            myWSServer.emit('messages', [newMsg]);
          });
        
    })

    
    
    return myWSServer;
}

