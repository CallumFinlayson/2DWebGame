const express = require ('express')
const app = express()

var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socketIO');
var app = express();
var server = http.server(app);

var io = socketIO(server); 
app.set ('port', 5000);
app.use ('/static', express.static( dirname + '/static'));
app.get('/', function(request, resoonse) {
	reaponse.sendFile(path.join(_dirname, 'index.html'));
}); //Starts the server
server.listen(5000, function() {
	console.log('Starting server on port 5000');
});
