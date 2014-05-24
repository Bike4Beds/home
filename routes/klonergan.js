// klonergan.js

 var fs = require('fs'), 
  http = require('http');

console.log('klonergan.js');

exports.klonergan = function(req, res){
  console.log('klonergan page')
  fs.readFile('./public/klonergan.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good klonergan fs');
      };
      var d = { mainBodyText: data};
      console.log('rendering klonergan');
      res.render('klonergan', d);
  });
};