const express = require('express');
const app = express();
require('dotenv').config();

const servidor = app.listen( process.env.PORT, ()=>{
    console.log(`Servidor cargando (chat)...${process.env.PORT}`);
});
app.use('/', require('./rutas') );

//caht
const SocketIO = require('socket.io');
const io = SocketIO(servidor);

io.on('connection',(socket)=>{
    console.log('Nueva conección', socket.id); //id del usuario conectado
    socket.join("a");
    socket.on('chat', (data)=>{
        console.log("mensaje: todos: ", data);
        //io.to("a").emit('recibe', data);
    });
    
    
    //Escuchar eventos (recibe mesajes) pero solo mensaje "chat"
    socket.on('chat', (data)=>{
        console.log("mensaje:: ", data);
        //Emitir datos a los conectados pero solo tipo "recibe"
        io.sockets.emit('recibe', data);
    });
});