
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
//var Stripe = require('stripe')(process.env.STRIPE_API_KEY);
var Stripe = require('stripe')(stripeApiKeyTesting);

var publicStripeApiKeyTesting = 'pk_test_iJZ2F2cUTwotuyV2OH6VHThg';

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


// app.post('/pledge', function(req, res){
//    dbCalls.save(populatePledge(req), generateBikerList(req, res) );
// });

app.post('/pledge', function(req, res){
   dbCalls.save(populatePledge(req), getRenderPLedgeView(req, res) );
});



function populatePledge(req){
  return {
  firstName:     req.param('firstName'),
  lastName:      req.param('lastName'),
  streetAddr:    req.param('streetAddr'),
  city:          req.param('city'),
  state:         req.param('state'),
  zip:           req.param('zip'),
  email:         req.param('email'),
  phoneNbr:      req.param('phoneNbr'),
  bikeEvent:     req.param('bikeEvent'),
  biker:         req.param('biker'),
  amount:        req.param('amount'),
  paymentType:   req.param('paymentType'),
  paymentStatus: req.param('paymentStatus'),
  createDt:    req.param('createDt')
  };
}

// function generateBikerList(req, res){
//   return function(err, docs, rowId) {
//     console.log('TEST')
//     if (err){
//       dbCalls.getBikerList('', getRenderPledgeView(req, res, rowId, err));
//     } else {
//       dbCalls.getBikerList('', getRenderPledgeView(req, rowId, res));  
//     }
//   }
// }

var getRenderPLedgeView = function(req, res) {
  return function (err, docs, rowId){
     console.log('getRenderPledgeView rowId: ' + rowId);
     if (err){
          resJsonErrPLedge(req, res, err);

      } else {
         var paymentType = req.param('paymentType');
         console.log('PaymentType: ' + paymentType);
         if (req.param('paymentType') == 'creditCard'){
            stripeCreditCardPledge(req, res, rowId);
         } else {
            checkPaymentPledge(req, res);
         }
      }   
    }
  };


// var getRenderPledgeView = function(req, res, rowId, err) {
//   return function (error, bikersList){
//       console.log('made it to bikerlist callback');
//       if (error){
//         console.log('couldnot get bikerlist');
//       } else {
//          if (err){
//             resJsonErrPledge(req, res, err);
//           } else {
//              var paymentType = req.param('paymentType');
//              console.log('PaymentType: ' + paymentType);
//              if (req.param('paymentType') == 'creditCard'){
//                 stripeCreditCardPledge(req, res, rowId);
//              } else {
//                 checkPaymentPledge(req, res);
//              }
//           } 
//       }  //else on find error
//   } //end of get biker list 
// };

//payment by check
function checkPaymentPledge(req, res){
  dbCalls.sendConfirmEmail(req);
  //dbCalls.sendConfirmEmailBikes(req); 
  resJsonPledge(req, res);
};

//Payment by CreditCard
function stripeCreditCardPledge(req, res, rowId){
  //get the credit card details
  token = req.param('stripeToken')
  amount = req.param('amount')
  email = req.param('email')

  //Create the Customer 
  Stripe.customers.create(
     { email: email,
       card: token },
     function(err, customer) {
        if (err) {
           console.log('Stripe Customer Error:');
           err.name = err.message + ' \n' + ' PLease re-enter your card information or pay by check.' ;  //Set the message to the name
           resJsonErrPLedge(req, res, err);
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
              console.log('Stripe Charge Error:');
              err.name = err.message + ' \n' + ' PLease re-enter your card information or pay by check.';
              resJsonErrPledge(req, res, err);
              return;
            } else {
              console.log('RowId: ' + rowId);
              dbCalls.updatePaymentStatusPledge(rowId);
              resJsonPledge(req, res);
              dbCalls.sendConfirmEmail(req); 
            }
          } 
        );
     }
  );
} 

//Send back cleared columns if there is not an error
function resJsonPledge(req, res){
  console.log('TEST-SUCCESS');
  console.log('appjs publicStripeKey :' + publicStripeApiKeyTesting);
  res.json({'dataSave': '', 'error': '', 'publicStripeApiKey': '',
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
            'amount':     '', 
            'paymentType': '', 
            'paymentStatus': '',
            'bikersList': '' });  //JSON.stringify(bikersList) });
};

function resJsonErrPledge(req, res, err){
    console.log('TEST-ERROR');
    console.log(err);
    res.json({'dataSave': 'err', 'error': err, 'publicStripeApiKey': '',
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
            'amount':     req.param('amount'),
            'paymentType': req.param('paymentType'),
            'paymentStatus': req.param('paymentStatus'),
            'bikersList': '' }); //JSON.stringify(bikersList) });
  };


//----------] Bikes [-------------

app.post('/bikes', function(req, res){
   dbCalls.saveBike(populateBiker(req), getRenderBikeView(req, res));

});

function populateBiker(req){
  return {
  firstName:     req.param('firstName'),
  lastName:      req.param('lastName'),
  streetAddr:    req.param('streetAddr'),
  city:          req.param('city'),
  state:         req.param('state'),
  zip:           req.param('zip'),
  email:         req.param('email'),
  phoneNbr:      req.param('phoneNbr'),
  bikeEvent:     req.param('bikeEvent'),
  agreement:     req.param('agreement'),
  overSixteen:   req.param('overSixteen'),
  birthdate:     req.param('birthdate'),
  signature:     req.param('signature'), 
  shirt:         req.param('shirt'),
  sponsorship:   req.param('sponsorship'),
  createDt:      req.param('createDt'),
  amount:        req.param('amount'),
  paymentType:   req.param('paymentType'),
  paymentStatus: req.param('paymentStatus')
  };
}

var getRenderBikeView = function(req, res) {
  return function (err, docs, rowId){
     console.log('getRenderBikeView rowId: ' + rowId);
     if (err){
          resJsonErrBikes(req, res, err);

      } else {
         var paymentType = req.param('paymentType');
         console.log('PaymentType: ' + paymentType);
         if (req.param('paymentType') == 'creditCard'){
            stripeCreditCardBikes(req, res, rowId);
         } else {
            checkPaymentBikes(req, res);
         }
      }   
    }
  };

  //payment by check
  function checkPaymentBikes(req, res){
    dbCalls.sendConfirmEmailBikes(req); 
    resJsonBikes(req, res);
  };

  //Payment by CreditCard
  function stripeCreditCardBikes(req, res, rowId){
    //get the credit card details
    token = req.param('stripeToken')
    amount = req.param('amount')
    email = req.param('email')

    //Create the Customer 
    Stripe.customers.create(
       { email: email,
         card: token },
       function(err, customer) {
          if (err) {
             console.log('Stripe Customer Error:');
             err.name = err.message + ' \n' + ' PLease re-enter your card information or pay by check.' ;  //Set the message to the name
             resJsonErrBikes(req, res, err);
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
                console.log('Stripe Charge Error:');
                err.name = err.message + ' \n' + ' PLease re-enter your card information or pay by check.';
                resJsonErrBikes(req, res, err);
                return;
              } else {
                console.log('RowId: ' + rowId);
                dbCalls.updatePaymentStatusBikes(rowId);
                resJsonBikes(req, res);
                dbCalls.sendConfirmEmailBikes(req); 
              }
            } 
          );
       }
    );
  } 


//Send back cleared columns if there is not an error
function resJsonBikes(req, res){
        console.log('Send back blank bikersList');
        res.json({'dataSave':  '', 'error': '',
              'firstName':     '',
              'lastName':      '',
              'streetAddr':    '',
              'city':          '',
              'state':         '',
              'zip':           '',
              'phoneNbr':      '',
              'email':         '',
              'bikeEvent':     '',
              'agreement':     '',
              'overSixteen':   '',
              'birthdate':     '',
              'signature':     '', 
              'shirt':         '',
              'sponsorship':   '',
              'amount':        '',
              'paymentType':   '',
              'paymentStatus': ''
            });
};

//Send back columns filled if an error is detected
function resJsonErrBikes(req, res, err){
      console.log('Error: Send back bikersList');
      console.log('Error: ' + err);
      console.log(err);
      res.json( {'dataSave': 'err', 'error': err,
              'firstName':     req.param('firstName'),
              'lastName':      req.param('lastName'),
              'streetAddr':    req.param('streetAddr'),
              'city':          req.param('city'),
              'state':         req.param('state'),
              'zip':           req.param('zip'),
              'phoneNbr':      req.param('phoneNbr'),
              'email':         req.param('email'),
              'bikeEvent':     req.param('bikeEvent'),
              'agreement':     req.param('agreement'),
              'overSixteen':   req.param('overSixteen'),
              'birthdate':     req.param('birthdate'),
              'signature':     req.param('signature'),
              'shirt':         req.param('shirt'),
              'sponsorship':   req.param('sponsorship'),
              'amount':        req.param('amount'),
              'paymentType':   req.param('paymentType'),
              'paymentStatus': req.param('paymentStatus')
            });
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

