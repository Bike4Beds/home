// alaricelonergan.js

 var fs = require('fs'), 
  http = require('http');

console.log('alaricelonergan.js');

exports.alaricelonergan = function(req, res){
  console.log('alaricelonergan page')
  fs.readFile('./public/alaricelonergan.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good alaricelonergan fs');
      };
      var d = { mainBodyText: data};
      console.log('rendering alaricelonergan');
      res.render('alaricelonergan', d);
  });
};