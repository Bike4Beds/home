/*
 * GET "Bikes" page.
 */


 var fs = require('fs'),
  http = require('http'),
  env = process.env.NODE_ENV;

console.log('bikes.js');
console.log('Env: ' + env);

exports.bikes = function(req, res){
  fs.readFile('./public/bikes.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good bikes fs');
      //console.log(bikersListItems);
    };

      //pass the key here
      var d = { mainBodyText: data, dataSave: '',
      'firstName': '',
      'lastName': '',
      'streetAddr': '',
      'city': '',
      'state': '',
      'city': '',
      'zip': '',
      'phoneNbr': '',
      'email': '',
      'bikeEvent': '',
      'bikeRoute': '',
      'transportation': '',
      'agreement':   '',
      'overSixteen': '',
      'birthdate':   '',
      'signature':   '',
      'shirt': '',
      'sponsorship': '',
      'amount': '',
      'paymentType': '',
      'paymentStatus': '',
      'couponCode': '',
      'amountEnt': '',
      'coupon': '',
      'env': env
       };
      console.log('rendering bikes');
      res.render('bikes', d);

    });

  };


