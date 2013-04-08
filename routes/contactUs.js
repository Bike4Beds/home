/*
 * GET "contactUs" page.
 */
 

 var fs = require('fs'), 
  http = require('http');

console.log('contactUs.js');

exports.contactUs = function(req, res){
  console.log('contactUs page')
  fs.readFile('./public/contactUs.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good contactUs fs');
      };
      var d = { mainBodyText: data};
      console.log('rendering contactUs');
      res.render('contactUs', d);
  });
};