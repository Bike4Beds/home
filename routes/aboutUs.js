/*
 * GET "contactUs" page.
 */


 var fs = require('fs'),
  http = require('http');

console.log('aboutUs.js');

exports.aboutUs = function(req, res){
  console.log('aboutUs page')
  fs.readFile('./public/aboutUs.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good aboutUs fs');
      };
      var d = { mainBodyText: data};
      console.log('rendering aboutUs');
      res.render('aboutUs', d);
  });
};