
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
app.get('/driver/:driver_id?', function(req, res) {
  var driverID = req.param('driver_id') ? req.param('driver_id') : "" + parseInt(Math.round(Math.random()*103843)+7);
  console.log("Driver ID: " + driverID);
  //Get previous chat logs and render them in the file 
  res.render('index', {});
});


app.get('/gripper/:gripper_id?', function(req, res) {
  var gripperID = req.param('gripper_id') ? req.param('gripper_id') : "" + parseInt(Math.round(Math.random()*103843)+17);
  console.log("Gripper ID: " + gripperID);
  //Get previous chat logs and render them in the file 
  res.render('index', {});
});


app.get('/brobot/:bot_id?', function(req, res) {
  var botID = req.param('bot_id') ? req.param('bot_id') : "" + parseInt(Math.round(Math.random()*103843)+334);
  console.log("Bot ID: " + botID);
  //Get previous chat logs and render them in the file 
  res.render('index', {});
});





io.sockets.on('connection', function (socket) {
  
  function updatedBotData(botData) {
    if (botData) {
      socket.emit('updated-bot-data', botData);
    }
  }
 
  socket.on('updated-drive-data', function (driveData) {
    console.log("Drive Data: " + driveData);
    updatedBotData(driveData);
  });

  socket.on('updated-grip-data', function(gripData) {
    console.log("grip Data: " + gripData);
    updatedBotData(gripData);
  });

}); //End Socket IO





