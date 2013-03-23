/*
 * GET "Past5" page.
 */
 

 var fs = require('fs'), 
  http = require('http');

console.log('past5.js');

exports.past5 = function(req, res){
  console.log('past5 page')
  fs.readFile('./public/past5.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good past5 fs');
      };
      var d = { mainBodyText: data};
      console.log('rendering past5');
      res.render('past5', d);
  });
};