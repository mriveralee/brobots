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
//app.get('/', routes.index);

//DRIVER
app.get('/driver', function(req, res) {
  var driverID = req.param('driver_id') ? req.param('driver_id') : "" + parseInt(Math.round(Math.random()*103843)+7);
  console.log("Driver ID: " + driverID);
  res.render('index', {USER_TYPE: "Driver"});
});


app.get('/gripper', function(req, res) {
  var gripperID = req.param('gripper_id') ? req.param('gripper_id') : "" + parseInt(Math.round(Math.random()*103843)+17);
  console.log("Gripper ID: " + gripperID);
  res.render('index', {USER_TYPE: "Gripper"});
});


app.get('/brobot', function(req, res) {
  var botID = req.param('bot_id') ? req.param('bot_id') : "" + parseInt(Math.round(Math.random()*103843)+334);
  console.log("Bot ID: " + botID);
  res.render('index', {USER_TYPE: "Bot"});
});




//Socket-IO Messages
io.sockets.on('connection', function (socket) {
  
  function updatedBotData(botData) {
    if (botData) {
      //console.log("Emitting received bot data");
      socket.broadcast.emit('updated-bot-data', botData);
    }
  }
 
  socket.on('updated-drive-data', function (driveData) {
    //console.log("Drive Data: " + driveData);
    updatedBotData(driveData);
  });

  socket.on('updated-grip-data', function(gripData) {
    //console.log("grip Data: " + gripData);
    updatedBotData(gripData);
  });

}); //End Socket IO





