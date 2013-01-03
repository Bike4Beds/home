/*
 * GET "Bikes" page.
 */
 

 var fs = require('fs'), 
  http = require('http');

console.log('past.js');

exports.past = function(req, res){
  console.log('past page')
  fs.readFile('./public/past.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good past fs');
      };
      var d = { mainBodyText: data};
      console.log('rendering past');
      res.render('past', d);
  });
};