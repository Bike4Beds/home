/*
 * GET "Pledge" page.
 */

 var fs = require('fs'), 
  http = require('http'),
  _dbCalls = require('../dbCalls').dbCalls,
  env = process.env.NODE_ENV;
  dbCalls = new _dbCalls();
  //ST = require('ST')

console.log('Pledge.js ENV: ' + env)

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

    var d = { mainBodyText: data, dataSave: '', 'error': err, 
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
    'paymentStatus': '',
    'env': env};
    //var d = { mainBodyText: data, stateList: ST}
    console.log('rendering pledge');
    res.render('pledge', d);



    });

  };


