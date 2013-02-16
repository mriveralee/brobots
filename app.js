
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


//DRIVER
app.get('/driver/:driver_id?', function(req, res) {
  var driverID = req.param('driver_id') ? req.param('driver_id') : "" + parseInt(Math.round(Math.random()*103843)+7);
  
  var whereParams = {driver_id: driverID};

  // chatLogModel.update(whereParams, whereParams, {upsert: true}, function(err, room){
  //     if (err) {
  //       throw err;
  //       console.log("Could not upsert user");
  //     }
  //     else {
  //       if (room.chat_log) {
  //         //console.log(room);
  //       }
  //       //console.log("Chat Log in DB");
  //     }
  //   });
  console.log("Driver ID: " + driverID);
  //Get previous chat logs and render them in the file 
  res.render('index', {
    //RENDERVARS: { 
    //  room_id: roomID
    //}
  });
});


app.get('/gripper/:gripper_id?', function(req, res) {
  var gripperID = req.param('gripper_id') ? req.param('gripper_id') : "" + parseInt(Math.round(Math.random()*103843)+17);
  
  var whereParams = {gripper_id: gripperID};

  // chatLogModel.update(whereParams, whereParams, {upsert: true}, function(err, room){
  //     if (err) {
  //       throw err;
  //       console.log("Could not upsert user");
  //     }
  //     else {
  //       if (room.chat_log) {
  //         //console.log(room);
  //       }
  //       //console.log("Chat Log in DB");
  //     }
  //   });
  console.log("Gripper ID: " + gripperID);
  //Get previous chat logs and render them in the file 
  res.render('index', {
    //RENDERVARS: { 
    //  room_id: roomID
    //}
  });
});


app.get('/brobot/:bot_id?', function(req, res) {
  var botID = req.param('bot_id') ? req.param('bot_id') : "" + parseInt(Math.round(Math.random()*103843)+334);
  
  var whereParams = {bot_id: botID};
  console.log("Bot ID: " + botID);
  //Get previous chat logs and render them in the file 
  res.render('index', {
    //RENDERVARS: { 
    //  room_id: roomID
    //}
  });
});










