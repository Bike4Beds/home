/*
 * GET "Pledge" page.
 */
 

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
    var Pledge = mongoose.model('Pledge', Pledge);

    // var bikeEvent = req.bikeEvent || '';
    // pledge.

    // var bikersList = '';
    // Pledge.find({}, {firstName: 1, lastName: 1, _id: 0}, function (err, bikersList) {  
    //      if(err){
    //       console.log('db error export bikers')
    //      }else{
          //mongoose.connection.close();

          //console.log(JSON.stringify(bikersList));
          //console.log('test bikers list');
          //bikersList = bikersList || 'no bikers found';
          var d = { mainBodyText: data, dataSave: '', 
          'firstName': '',
          'lastName': '',
          'streetAddr': '',
          'city': '',
          'state': '',
          'city': '',
          'state': '',
          'zip': '',
          'phoneNbr': '',
          'email': '',
          'bikeEvent': '',
          'biker': ''};
          //var d = { mainBodyText: data, stateList: ST}
          console.log('rendering pledge');
          res.render('pledge', d);

      //     } //bikers list
      // }); // end Team.find

    });

  };




