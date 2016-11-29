var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app); //for http server. Anything the express app listens to
//the server also listens to
app.use(express.static(__dirname + '/public'));

http.listen(PORT, function(){
    console.log('server started');
});