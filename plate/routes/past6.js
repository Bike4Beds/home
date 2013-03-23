/*
 * GET "Past6" page.
 */
 

 var fs = require('fs'), 
  http = require('http');

console.log('past6.js');

exports.past6 = function(req, res){
  console.log('past6 page')
  fs.readFile('./public/past6.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good past6 fs');
      };
      var d = { mainBodyText: data};
      console.log('rendering past6');
      res.render('past6', d);
  });
};