/*
 * GET "Pledge" page.
 */
 

 var fs = require('fs'), 
  http = require('http'),
  $ = require('jquery');
  //ST = require('ST')

var mongoose = require('mongoose');

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
   
    var bikersList = '';
    Pledge.find({}, {firstName: 1, lastName: 1, _id: 0}, function (err, bikersList) {  
         if(err){
          console.log('db error export bikers')
         }else{
          //mongoose.connection.close();

          console.log(JSON.stringify(bikersList));
          console.log('test bikers list');
          var d = { mainBodyText: data, fuck : '',  'error': err, 
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
          'bikersList': JSON.stringify(bikersList)};
          //var d = { mainBodyText: data, stateList: ST}
          console.log('rendering pledge');
          res.render('pledge', d);

          } //bikers list
      }); // end Team.find

    });

  };




