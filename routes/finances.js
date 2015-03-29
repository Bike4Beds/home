// finances.js

 var fs = require('fs'),
  http = require('http');

console.log('finances.js');

exports.finances = function(req, res){
  console.log('finances page')
  fs.readFile('./public/finances.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good finances fs');
      };
      var d = { mainBodyText: data};
      console.log('rendering finances');
      res.render('finances', d)
  });
};