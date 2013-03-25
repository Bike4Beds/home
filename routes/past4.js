/*
 * GET "Past4" page.
 */
 

 var fs = require('fs'), 
  http = require('http');

console.log('past4.js');

exports.past4 = function(req, res){
  console.log('past4 page')
  fs.readFile('./public/past4.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good past4 fs');
      };
      var d = { mainBodyText: data};
      console.log('rendering past4');
      res.render('past4', d);
  });
};