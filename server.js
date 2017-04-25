var PORT = process.env.PORT || 3000;
var moment = require('moment');
var express = require('express');
var app = express();
var http = require('http').Server(app); //for http server. Anything the express app listens to
//the server also listens to
var io = require('socket.io')(http); //io variable is like the app variable
var clientInfo = {};
app.use(express.static(__dirname + '/public'));
io.on('connection', function(socket){
    console.log('User connected via socket.io');

    socket.on('joinRoom', (req) => {
        clientInfo[socket.id] = req; 
        console.log('clientinfo', clientInfo);
        socket.join(req.room);
        socket.broadcast.to(req.room).emit('message', {text: 'user just joined!!'})
    })

    socket.on('message', function(message){
        console.log('Message received:' + JSON.stringify(message));
        message.timestamp = moment().valueOf();
        console.log('msg clientinfo room', clientInfo[socket.id].room);
        io.to(clientInfo[socket.id].room).emit('message', message);
    });
    //broadcast.emit sends it to everyone except the sender of that message

    socket.emit('message', {
        text: 'Welcome to the chat app!',
        timestamp: moment().valueOf()
    });
}); //telling server to wait for a connection and when it gets one, it prints that message
//socket is an individual connection to the server
//on the front end we need to listen for that 'message' event

http.listen(PORT, function(){
    console.log('server started');
});