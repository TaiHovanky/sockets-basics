var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app); //for http server. Anything the express app listens to
//the server also listens to
var io = require('socket.io')(http); //io variable is like the app variable
app.use(express.static(__dirname + '/public'));
io.on('connection', function(socket){
    console.log('User connected via socket.io');

    socket.on('message', function(message){
        console.log('Message received:' + message.text);
        socket.broadcast.emit('message', message);
    });
    //broadcast.emit sends it to everyone except the sender of that message

    socket.emit('message', {
        text: 'Welcome to the chat app!'
    });
}); //telling server to wait for a connection and when it gets one, it prints that message
//socket is an individual connection to the server
//on the front end we need to listen for that 'message' event

http.listen(PORT, function(){
    console.log('server started');
});