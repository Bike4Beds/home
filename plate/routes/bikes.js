/*
 * GET "Bikes" page.
 */
 

 var fs = require('fs'), 
  http = require('http');

console.log('bikes.js');

exports.bikes = function(req, res){
  fs.readFile('./public/bikes.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good bikes fs');
      //console.log(bikersListItems);
    };

      //pass the key here
      var d = { mainBodyText: data, dataSave: '',  'error': err, 
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
      'agreement':   '',
      'overSixteen': '',
      'birthdate':   '',
      'signature':   '',
      'shirt': '',
      'sponsorship': '',
      'amount': '',
      'paymentType': '',
      'paymentStatus': '' };
      console.log('rendering bikes');
      res.render('bikes', d);

    });

  };


