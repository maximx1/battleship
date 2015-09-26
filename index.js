var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var reload = require("reload");
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

reload(server, app);

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

io.on('connection', function (socket) {
  // socket.on('attempt hit', function (data) {
  // });
});
