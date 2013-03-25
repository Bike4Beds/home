/*
 * GET "Past2" page.
 */
 

 var fs = require('fs'), 
  http = require('http');

console.log('past2.js');

exports.past2 = function(req, res){
  console.log('past2 page')
  fs.readFile('./public/past2.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good past2 fs');
      };
      var d = { mainBodyText: data};
      console.log('rendering past2');
      res.render('past2', d);
  });
};