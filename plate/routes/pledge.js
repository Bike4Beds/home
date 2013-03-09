/*
 * GET "Pledge" page.
 */
 var publicStripeApiKey = (process.env.STRIPE_PRIVATE_KEY);

console.log('stripePrivateKey :' + process.env.STRIPE_PRIVATE_KEY);

 var fs = require('fs'), 
  http = require('http'),
  _dbCalls = require('../dbCalls').dbCalls;
  dbCalls = new _dbCalls();
  //ST = require('ST')

var mongoose = require('mongoose');

exports.retrieveBikerList = function(req, res){
  var bikeEvent = req.params.bikeEvent || '';
  console.log('retrieveBikerLists: ' + bikeEvent);
  dbCalls.getBikerList(bikeEvent, function(error, list){
    if(error){
      res.send('no bikers');
    }
    else{
      res.json(list);
    }
  })

}

exports.pledge = function(req, res){
  console.log('pledge page')
  fs.readFile('./public/pledge.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good pledge fs');
      //console.log(bikersListItems);
    };
    //var Pledge = mongoose.model('Pledge', Pledge);

    var d = { mainBodyText: data, dataSave: '', 'error': err, publicStripeApiKey: publicStripeApiKey,
    'firstName': '',
    'lastName': '',
    'streetAddr': '',
    'city': '',
    'state': '',
    'zip': '',
    'phoneNbr': '',
    'email': '',
    'bikeEvent': '',
    'biker': '',
    'amount':     '', 
    'paymentType': '', 
    'paymentStatus': ''};
    //var d = { mainBodyText: data, stateList: ST}
    console.log('rendering pledge');
    res.render('pledge', d);



    });

  };


