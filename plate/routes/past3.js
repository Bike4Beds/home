/*
 * GET "Past3" page.
 */
 

 var fs = require('fs'), 
  http = require('http');

console.log('past3.js');

exports.past3 = function(req, res){
  console.log('past3 page')
  fs.readFile('./public/past3.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good past3 fs');
      };
      var d = { mainBodyText: data};
      console.log('rendering past3');
      res.render('past3', d);
  });
};