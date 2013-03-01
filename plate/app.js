
/**
 * Module dependencies.
   Bike4Beds
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , dbCalls = require('./dbCalls')
  , email = require('emailjs/email')
  , bike = require('./routes/bikes')
  , pledge = require('./routes/pledge')
  , UpcomingEventsA = require('./routes/UpcomingEventsA')
  , UpcomingEventsB = require('./routes/UpcomingEventsB')
  , past = require('./routes/past')
  , volunteer = require('./routes/volunteer')
  , testingPage = require('./routes/testingPage')
  , emailsettings = require('./routes/email-settings');

// var stripeApiKey = '...';
var stripeApiKeyTesting = "sk_test_ZbsWSnOFBE8eJdK1PpLqGgC1";
var Stripe = require('stripe')(stripeApiKeyTesting);

  //, less = require('less'); https://groups.google.com/forum/?fromgroups=#!topic/express-js/DHvwYqkeXpw

var app = express(express.bodyDecoder);

var dbCalls = require('./dbCalls').dbCalls;
var dbCalls = new dbCalls();

var dbCallsBike = require('./dbCalls').dbCallsBike;
// var dbCallsBike = new dbCalls();


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
app.get('/bikerList/:bikeEvent?', pledge.retrieveBikerList);





/*

//Version 1 of the refactor

//No way of keeping the state of the request and response, so 
//  it needs to be chained. Because of the async returning, it 
//  coded to wait for the response.
 
app.post('/pledge', function(req, res){
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

    dbCalls.getBikerList('', function(error, bikersList){
          console.log('made it to bikerlist callbacks');
          if (error){
            console.log('couldnot get bikerlist');
          } 
          else {

             if (err){
                console.log('TEST-ERROR');
                console.log(err);
              res.render('pledge', {'dataSave': 'err', 'error': err,
                      'firstName':  req.param('firstName'),
                      'lastName':   req.param('lastName'),
                      'streetAddr': req.param('streetAddr'),
                      'city':       req.param('city'),
                      'state':      req.param('state'),
                      'zip':        req.param('zip'),
                      'phoneNbr':   req.param('phoneNbr'),
                      'email':      req.param('email'),
                      'bikersList': JSON.stringify(bikersList) });
              } 
              else {
                console.log('TEST-SUCCESS');
                console.log(bikersList);
                res.render('pledge',{'dataSave': '', 'error': '', 
                      'firstName':  '',
                      'lastName':   '',
                      'streetAddr': '',
                      'city':       '',
                      'state':      '',
                      'zip':        '',
                      'phoneNbr':   '',
                      'email':      '',
                      'bikersList': JSON.stringify(bikersList) });
              } 
           }  //else on find error
      } //end of get biker list 
    );
  });
});

*/


/*

//Version 2 of the refactor

// Passing the request and resonse to the database call
//   Fixed dbCalls.save by encapsolating to a function 
//      but still passes req & res
//   Also still not unchaining the functions

// error logic in two areas, makes the code clumsy and difficult to follow

app.post('/pledge', function(req, res){
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
  }, renderPledgeView(req, res) );
});



function renderPledgeView(req, res){
  return function(err, docs) {
    console.log('TEST')

    dbCalls.getBikerList(function(error, bikersList){
          console.log('made it to bikerlist callback');
          if (error){
            console.log('couldnot get bikerlist');
          } 
          else {

             if (err){
                console.log('TEST-ERROR');
                console.log(err);
              res.render('pledge', {'dataSave': 'err', 'error': err,
                      'firstName':  req.param('firstName'),
                      'lastName':   req.param('lastName'),
                      'streetAddr': req.param('streetAddr'),
                      'city':       req.param('city'),
                      'state':      req.param('state'),
                      'zip':        req.param('zip'),
                      'phoneNbr':   req.param('phoneNbr'),
                      'email':      req.param('email'),
                      'bikersList': JSON.stringify(bikersList) });
              } 
              else {
                console.log('TEST-SUCCESS');
                console.log(bikersList);
                res.render('pledge',{'dataSave': '', 'error': '', 
                      'firstName':  '',
                      'lastName':   '',
                      'streetAddr': '',
                      'city':       '',
                      'state':      '',
                      'zip':        '',
                      'phoneNbr':   '',
                      'email':      '',
                      'bikersList': JSON.stringify(bikersList) });
              } 
           }  //else on find error
      } //end of get biker list 
    );
  }

}



*/






// app.post  callback calls dbCalls.save 
// dbCalls.save input param (what to save) call back will be called by the 
//    generateBikerList returning db function(err, docs)
// This made the inputs more readable, allows more flexibility in future modification
//   possibly by adding logic for firstName.  It also allowed us to send req, res to 
//   the generateBikerList w/o sending it to the popluateBiker
//   By creating the wrapper function - we were able to remove the negative effects of
//   chaining (sending req, res) to the save, but still be able to send req, res to 
//   generateBikerList.






app.post('/pledge', function(req, res){
   dbCalls.save(populatePledge(req), generateBikerList(req, res) );
});



function populatePledge(req){
  return {
  firstName:   req.param('firstName'),
  lastName:    req.param('lastName'),
  streetAddr:  req.param('streetAddr'),
  city:        req.param('city'),
  state:       req.param('state'),
  zip:         req.param('zip'),
  email:       req.param('email'),
  phoneNbr:    req.param('phoneNbr'),
  bikeEvent:   req.param('bikeEvent'),
  biker:       req.param('biker'),
  createDt:    req.param('createDt')
  };
}

function generateBikerList(req, res){
  return function(err, docs) {
    console.log('TEST')
    if (err){
      dbCalls.getBikerList('', getRenderPledgeView(req, res, err));
    } else {
      dbCalls.getBikerList('', getRenderPledgeView(req, res));  //, getStripe(req, res));
      //Call credit card req.isCreditCard
    }
  }
}

// var getStripe = function(req, res) {
//   stripe.customers.create({
//     card : req.body.stripeToken,
//     email : "...", // customer's email (get it from db or session)
//     plan : "bike4beds"
//   }, function (err, customer) {
//     if (err) {
//       console.log('appjs stripe error');
//       var msg = customer.error.message || "unknown";
//       res.send("Error while processing your payment: " + msg);
//     }
//     else {
//       var id = customer.id;
//       console.log('Success! Customer with Stripe ID ' + id + ' just signed up!');
//       // save this customer to your database here!
//       res.send('ok');
//     }
//   });
// };


var getRenderPledgeView = function(req, res, err) {
  return function (error, bikersList){
          console.log('made it to bikerlist callback');
          if (error){
            console.log('couldnot get bikerlist');
          } 
          else {

             if (err){
                console.log('TEST-ERROR');
                console.log(err);
                // res.render('pledge', {'dataSave': 'err', 'error': err,
                //         'firstName':  req.param('firstName'),
                //         'lastName':   req.param('lastName'),
                //         'streetAddr': req.param('streetAddr'),
                //         'city':       req.param('city'),
                //         'state':      req.param('state'),
                //         'zip':        req.param('zip'),
                //         'phoneNbr':   req.param('phoneNbr'),
                //         'email':      req.param('email'),
                //         'bikeEvent':  req.param('bikeEvent'),
                //         'biker':      req.param('biker'),
                //         'bikersList': JSON.stringify(bikersList) });
              res.json({'dataSave': 'err', 'error': err,
                      'firstName':  req.param('firstName'),
                      'lastName':   req.param('lastName'),
                      'streetAddr': req.param('streetAddr'),
                      'city':       req.param('city'),
                      'state':      req.param('state'),
                      'zip':        req.param('zip'),
                      'phoneNbr':   req.param('phoneNbr'),
                      'email':      req.param('email'),
                      'bikeEvent':  req.param('bikeEvent'),
                      'biker':      req.param('biker'),
                      'bikersList': JSON.stringify(bikersList) });
              } 
              else {
                console.log('TEST-SUCCESS');
                console.log(bikersList);
                // res.render('pledge',{'dataSave': '', 'error': '', 
                //       'firstName':  '',
                //       'lastName':   '',
                //       'streetAddr': '',
                //       'city':       '',
                //       'state':      '',
                //       'zip':        '',
                //       'phoneNbr':   '',
                //       'email':      '',
                //       'bikeEvent':  '',
                //       'biker':      '',
                //       'bikersList': JSON.stringify(bikersList) });

            res.json({'dataSave': '', 'error': '', 
                      'firstName':  '',
                      'lastName':   '',
                      'streetAddr': '',
                      'city':       '',
                      'state':      '',
                      'zip':        '',
                      'phoneNbr':   '',
                      'email':      '',
                      'bikeEvent':  '',
                      'biker':      '',
                      'bikersList': JSON.stringify(bikersList) });
              } 
           }  //else on find error
      } //end of get biker list 
  };




app.post('/bikes', function(req, res){
   dbCalls.saveBike(populateBiker(req), getRenderBikeView(req, res));

});

function populateBiker(req){
  return {
  firstName:   req.param('firstName'),
  lastName:    req.param('lastName'),
  streetAddr:  req.param('streetAddr'),
  city:        req.param('city'),
  state:       req.param('state'),
  zip:         req.param('zip'),
  email:       req.param('email'),
  phoneNbr:    req.param('phoneNbr'),
  bikeEvent:   req.param('bikeEvent'),
  agreement:   req.param('agreement'),
  overSixteen: req.param('overSixteen'),
  birthdate:   req.param('birthdate'),
  signature:   req.param('signature'), 
  shirt:       req.param('shirt'),
  sponsorship: req.param('sponsorship'),
  createDt:    req.param('createDt'),
  amount:      req.param('amount'),
  paymentType: req.param('#creditCard') || req.param('#check')  
  };
}

var getRenderBikeView = function(req, res) {
  return function (err, docs){
        console.log('postStripePayment');
        // get the credit card details submitted by the form
        token = req.param('stripeToken')
        amount = req.param('amount')
        email = req.param('email')

        console.log('token: ' + token);
     if (err){
        console.log('TEST-ERROR');
        console.log(err);
        console.log(req.param('paymentType'));
        console.log(req.param('#check'));
        console.log(req.param('#creditCard'));
      res.json( {'dataSave': 'err', 'error': err,
              'firstName':   req.param('firstName'),
              'lastName':    req.param('lastName'),
              'streetAddr':  req.param('streetAddr'),
              'city':        req.param('city'),
              'state':       req.param('state'),
              'zip':         req.param('zip'),
              'phoneNbr':    req.param('phoneNbr'),
              'email':       req.param('email'),
              'bikeEvent':   req.param('bikeEvent'),
              'agreement':   req.param('agreement'),
              'overSixteen': req.param('overSixteen'),
              'birthdate':   req.param('birthdate'),
              'signature':   req.param('signature'),
              'shirt':       req.param('shirt'),
              'sponsorship': req.param('sponsorship'),
              'amount':      req.param('amount'),
              'paymentType': req.param('paymentType')
            });

      } else {
        console.log('TEST-SUCCESS');

        console.log(req.param('paymentType'));
        console.log(req.param('check'));
        console.log(req.param('creditCard'));

        //Create the Customer 
        Stripe.customers.create(
           { email: email,
             card: token },
           function(err, customer) {
              if (err) {
                 console.log(err.message);
                 return;
              }
              console.log("customer id", customer.id);

              //Have the customer, not create the charge
              Stripe.charges.create({
                amount: amount * 100, // amount in cents, again
                currency: "usd",
                customer: customer.id,
                //card: token,
                description: "bikeforbeds@gmail.com" },
                function(err, charge) {
                  if (err) {
                    console.log(err.message);
                    return;
                  }
                  console.log("stripe charge", charge);
                  dbCalls.sendConfirmEmail(req.param('email'),
                        'bikes',
                        'creditCard',
                        req.param('bikeEvent')); 
                } 
              );


           }
         );


        //console.log(bikersList);
        res.json({'dataSave': '', 'error': '',
              'firstName':   '',
              'lastName':    '',
              'streetAddr':  '',
              'city':        '',
              'state':       '',
              'zip':         '',
              'phoneNbr':    '',
              'email':       '',
              'bikeEvent':   '',
              'agreement':   '',
              'overSixteen': '',
              'birthdate':   '',
              'signature':   '', 
              'shirt':       '',
              'sponsorship': '',
              'amount':      '',
              'paymentType': ''
            });
      } 
     }  //else on find error
  };



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







// app.post('/bike', function(req, res){
//   dbCalls.saveBike({
//   firstName:   req.param('firstName'),
//   lastName:    req.param('lastName'),
//   bikeEvent:   req.param('bikeEvent'),
//   createDt:    req.param('createDt')
//   }, function(err, docs) {
//     console.log('TEST')

//     if (err){
//       console.log('TEST-ERROR');
//       console.log(err);
//     //res.render('errorForm', { title: Form Error, errors: err })
//     //res.redirect('/pledge', { error: err });
//     //res.send(500,  'this is an error');
//     res.render('bike', {'dataSave': 'err', 'error': err,
//             'firstName':  req.param('firstName'),
//             'lastName':   req.param('lastName'),
//             'bikeEvent': req.param('bikeEvent')
//              });
//     } 
//     else {
//       console.log('TEST-SUCCESS');
//       res.render('bike',{'dataSave': '', 'error': '', 
//             'firstName':  '',
//             'lastName':   '',
//             'bikeEvent': '' });
// });

