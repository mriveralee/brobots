
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);
  
  server.listen(3000);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//Send index
app.get('/', routes.index);

//app.get('/users', user.list);

// http.createServer(app).listen(app.get('port'), function(){
//   console.log("Express server listening on port " + app.get('port'));
// });


//var io = require('socket.io').listen(8080);

io.sockets.on('connection', function (socket) {
  
  //Test Emit
  socket.emit('news', { hello: 'world' });
  

  socket.on('update-from-client', function (nodeData) {
    socket.broadcast.emit('update-from-server', nodeData);
    console.log(nodeData);
  });



}); //End Socket IO



