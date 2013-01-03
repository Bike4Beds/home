/*
 * GET "Volunteer" page.
 */
 

 var fs = require('fs'), 
  http = require('http');

console.log('volunteer.js');

exports.volunteer = function(req, res){
  console.log('volunteer page')
  fs.readFile('./public/volunteer.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good volunteer fs');
      };
      var d = { mainBodyText: data};
      console.log('rendering volunteer');
      res.render('volunteer', d);
  });
};
