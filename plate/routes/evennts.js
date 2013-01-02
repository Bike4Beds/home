/*
 * GET "Events" page.
 */
 

 var fs = require('fs'), 
  http = require('http');

console.log('evennts.js');

exports.evennts = function(req, res){
  console.log('evennts page')
  fs.readFile('./public/evennts.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good evennts fs');
      };
      var d = { mainBodyText: data};
      console.log('rendering evennts');
      res.render('evennts', d);
  });
};