
/**
 * Module dependencies.
   Bike4Beds
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , https = require('https')
  , path = require('path')
  , dbCalls = require('./dbCalls')
  , email = require('emailjs/email')
  , bike = require('./routes/bikes')
  , pledge = require('./routes/pledge')
  , volunteer = require('./routes/volunteer')
  , UpcomingEventsA = require('./routes/UpcomingEventsA')
  , UpcomingEventsB = require('./routes/UpcomingEventsB')
  , past = require('./routes/past')
  , past2 = require('./routes/past2')
  , past3 = require('./routes/past3')
  , past4 = require('./routes/past4')
  , past5 = require('./routes/past5')
  , past6 = require('./routes/past6')
  , volunteer = require('./routes/volunteer')
  , testingPage = require('./routes/testingPage')
  , contactUs = require('./routes/contactUs')
  , emailsettings = require('./routes/email-settings')
  , aboutUs = require('./routes/aboutUs')
  , finances = require('./routes/finances')
  , members = require('./routes/members');

// var stripeApiKey = '...';
var stripeApiKey = (process.env.STRIPE_PRIVATE_KEY);
//var stripeApiKey = "sk_test_ZbsWSnOFBE8eJdK1PpLqGgC1";

console.log('Test app.js');

var Stripe = require('stripe')(stripeApiKey);


//, less = require('less'); https://groups.google.com/forum/?fromgroups=#!topic/express-js/DHvwYqkeXpw

var app = express(express.bodyDecoder);

var dbCalls = require('./dbCalls').dbCalls;
var dbCalls = new dbCalls();

var dbCallsBike = require('./dbCalls').dbCallsBike;
var fs = require('fs');
var env = process.env.NODE_ENV;


app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  // app.set('key', fs.readFileSync('key.pem') );
  // app.set('cert', fs.readFileSync('cert.pem'));
  app.use(express.favicon());

  console.log('env: ' +env);
  if (env == 'production'){
    app.use(function (req, res, next) {
      console.log('in redirect');
      res.setHeader('Strict-Transport-Security', 'max-age=8640000; includeSubDomains')
      console.log('set header');
      if (req.headers['x-forwarded-proto'] !== 'https') {
        var dest = 'https://' + req.headers.host + '/';
        console.log('redirecting to ' + dest);
        return res.redirect(301, dest);
      }
      next();
    });
  };

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
app.get('/contactUs', contactUs.contactUs);
app.get('/past', past.past);
app.get('/2008', past.past);
app.get('/2009', past2.past2);
app.get('/2010', past3.past3);
app.get('/2011', past4.past4);
app.get('/2012', past5.past5);
app.get('/2013', past6.past6);
app.get('/volunteer', volunteer.volunteer);
app.get('/testingPage', testingPage.testingPage);
app.get('/aboutUs', aboutUs.aboutUs);
app.get('/finances', finances.finances);
//app.get('/email-settings', emailsettings.emailsettings);
//app.get('/emailjs/email', email.email);
app.get('/bikerList/:bikeEvent?', pledge.retrieveBikerList);
app.get('/members', members.members);



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
     console.log('getRenderPledgeView: ' + err);
     if (err){
          console.log('getRenderPledgeView: ' + err);
          resJsonErrPledge(req, res, err);

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
           err.name = 'Credit Card: ' + err.message + ' \n' + ' PLease re-enter your card information or pay by check.' ;  //Set the message to the name
           resJsonErrPledge(req, res, err);
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
              err.name = 'Credit Card: ' + err.message + ' \n' + ' PLease re-enter your card information or pay by check.';
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
            'amount':     '',
            'paymentType': '',
            'paymentStatus': '',
            'env':           req.param(process.env.NODE_ENV),
            'bikersList': '' });  //JSON.stringify(bikersList) });
};

function resJsonErrPledge(req, res, err){
    console.log('TEST-ERROR');
    err = 'Error: ' + err;
    console.log('test ' + err);
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
            'amount':     req.param('amount'),
            'paymentType': req.param('paymentType'),
            'paymentStatus': req.param('paymentStatus'),
            'env':           req.param(process.env.NODE_ENV),
            'bikersList': '' }); //JSON.stringify(bikersList) });
  };


//----------] Bikes [-------------

app.post('/bikes', function(req, res){
  dbCalls.saveBike(populateBiker(req), getRenderBikeView(req, res));
  //var biker = populateBiker(req);
  //dbCalls.saveBike(bike, getRenderBikeView(req, res));

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
  bikeRoute:     req.param('bikeRoute'),
  transportation:req.param('transportation'),
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
              'paymentStatus': '',
              'env':           req.param(process.env.NODE_ENV)
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
              'bikeRoute':     req.params['bikeRoute'],
              'transportation':req.params['transporation'],
              'agreement':     req.param('agreement'),
              'overSixteen':   req.param('overSixteen'),
              'birthdate':     req.param('birthdate'),
              'signature':     req.param('signature'),
              'shirt':         req.param('shirt'),
              'sponsorship':   req.param('sponsorship'),
              'amount':        req.param('amount'),
              'paymentType':   req.param('paymentType'),
              'paymentStatus': req.param('paymentStatus'),
              'env':           req.param(process.env.NODE_ENV)
            });
  };


//----------] volunteer [-------------

app.post('/volunteer', function(req, res){
   dbCalls.saveVolunteer(populateVolunteer(req), getRenderVolunteerView(req, res));

});

function populateVolunteer(req){
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
  shirt:         req.param('shirt'),
  createDt:      req.param('createDt')
  };
}

var getRenderVolunteerView = function(req, res) {
  return function (err, docs, rowId){
     console.log('getRenderVolunteerView rowId: ' + rowId);
     if (err){
        resJsonErrBikes(req, res, err);

      } else {
        dbCallsVolunteer(req, res);
      }
    }
  };

  //payment by check
  function dbCallsVolunteer(req, res){
    dbCalls.sendConfirmEmailVolunteer(req);
    resJsonVolunteer(req, res);
  };

//Send back cleared columns if there is not an error
function resJsonVolunteer(req, res){
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
        'shirt':         ''
      });
};

//Send back columns filled if an error is detected
function resJsonErrVolunteer(req, res, err){
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
          'shirt':         req.param('shirt')
        });
};

//--------------------

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


  // app.set('key', fs.readFileSync('key.pem') );
  // app.set('cert', fs.readFileSync('cert.pem'));

// var options = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// };

// var tls = require('tls');


// var server = tls.createServer(options, function() {
//   console.log('server connected');
// });
// server.listen(3000, function() {
//   console.log('server bound');
// });



// https.createServer(options, app).listen(app.get('port'));

// https.createServer(options, app).listen(app.get('port'), function(){
//   console.log("Express server listening on port " + app.get('port'));
// });



