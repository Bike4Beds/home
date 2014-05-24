// lritz.js

 var fs = require('fs'), 
  http = require('http');

console.log('lritz.js');

exports.lritz = function(req, res){
  console.log('lritz page')
  fs.readFile('./public/lritz.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good lritz fs');
      };
      var d = { mainBodyText: data};
      console.log('rendering lritz');
      res.render('lritz', d);
  });
};