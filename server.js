var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app); //for http server. Anything the express app listens to
//the server also listens to
var io = require('socket.io')(http); //io variable is like the app variable
app.use(express.static(__dirname + '/public'));
io.on('connection', function(){
    console.log('User connected via socket.io');
}); //telling server to wait for a connection and when it gets one, it prints that message


http.listen(PORT, function(){
    console.log('server started');
});