// jritz.js

 var fs = require('fs'), 
  http = require('http');

console.log('jritz.js');

exports.jritz = function(req, res){
  console.log('jritz page')
  fs.readFile('./public/jritz.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good jritz fs');
      };
      var d = { mainBodyText: data};
      console.log('rendering jritz');
      res.render('jritz', d);
  });
};