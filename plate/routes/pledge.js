/*
 * GET "Pledge" page.
 */
 

 var fs = require('fs'), 
  http = require('http'),
  $ = require('jquery');
  //ST = require('ST')


console.log('pledge.js');

exports.pledge = function(req, res){
  console.log('pledge page')
  fs.readFile('./public/pledge.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good pledge fs');

      };
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
      'email': ''};
      //var d = { mainBodyText: data, stateList: ST}
      console.log('rendering pledge');
      res.render('pledge', d);
  });
};


