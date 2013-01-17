
/**
 * Module dependencies.
   Bike4Beds
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , email = require('emailjs/email')
  , bike = require('./routes/bikes')
  , pledge = require('./routes/pledge')
  , UpcomingEventsA = require('./routes/UpcomingEventsA')
  , UpcomingEventsB = require('./routes/UpcomingEventsB')
  , past = require('./routes/past')
  , volunteer = require('./routes/volunteer')
  , testingPage = require('./routes/testingPage')
  , emailsettings = require('./routes/email-settings');


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
app.get('/past', past.past)
app.get('/volunteer', volunteer.volunteer);
app.get('/testingPage', testingPage.testingPage);
app.get('/email-settings', emailsettings.emailsettings);
app.get('/emailjs/email', email.email);


var dbCalls = require('./dbCalls').dbCalls;
var dbCalls = new dbCalls();

//create
app.post('/pledge', function(req, res, email){
  dbCalls.save({
  firstName:   req.param('firstName'),
  lastName:    req.param('lastName'),
  streetAddr:  req.param('streetAddr'),
  city:        req.param('city'),
  state:       req.param('state'),
  zip:         req.param('zip'),
  email:       req.param('email'),
  phoneNbr:    req.param('phoneNbr'),
  createDt:    req.param('createDt')
  }, function(err, docs) {
    console.log('TEST')

    if (err){
      console.log('TEST-ERROR');
      console.log(err);
    //res.render('errorForm', { title: Form Error, errors: err })
    //res.redirect('/pledge', { error: err });
    //res.send(500,  'this is an error');
    res.render('pledge', {'fuck': 'it', 'error': err,
            'firstName':  req.param('firstName'),
            'lastName':   req.param('lastName'),
            'streetAddr': req.param('streetAddr'),
            'city':       req.param('city'),
            'state':      req.param('state'),
            'zip':        req.param('zip'),
            'phoneNbr':   req.param('phoneNbr'),
            'email':      req.param('email') });
    } 
    else {
      console.log('TEST-SUCCESS');
      res.render('pledge',{'fuck': '', 'error': '', 
            'firstName':  '',
            'lastName':   '',
            'streetAddr': '',
            'city':       '',
            'state':      '',
            'zip':        '',
            'phoneNbr':   '',
            'email':      '' });
    }
  });
});

var ES = emailsettings;
var EM = {};
module.exports = EM;

EM.server = require("./node_modules/emailjs/email").server.connect({

  host      : ES.host,
  user      : ES.user,
  password  : ES.password,
  ssl       : true

});





http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
