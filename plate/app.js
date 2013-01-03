
/**
 * Module dependencies.
   Bike4Beds
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , bike = require('./routes/bikes')
  , pledge = require('./routes/pledge')
  , UpcomingEventsA = require('./routes/UpcomingEventsA')
  , UpcomingEventsB = require('./routes/UpcomingEventsB');
  //, less = require('less'); https://groups.google.com/forum/?fromgroups=#!topic/express-js/DHvwYqkeXpw

var app = express();

//var exp = require('express');
//var app = express.createServer();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
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

app.get('/', routes.index);
app.get('/bikes', bike.bikes);
app.get('/pledge', pledge.pledge);
app.get('/UpcomingEventsA', UpcomingEventsA.UpcomingEventsA);
app.get('/UpcomingEventsB', UpcomingEventsB.UpcomingEventsB);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
