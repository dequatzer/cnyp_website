var http = require("http");
var path = require("path");
var app = require('./app');
var port = 8080;
app.set('port', port);
var server = http.createServer(app);
server.listen(port);
console.log('Server started at localhost:'+port);