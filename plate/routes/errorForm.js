/*
 * GET "Pledge" page.
 */
 

 var fs = require('fs'), 
  http = require('http')
  //ST = require('ST')


console.log('pledge.js');

exports.pledge = function(req, res){
  console.log('rendering errorForm');
  res.render('errorForm');
};


