// jkuriger.js

 var fs = require('fs'), 
  http = require('http');

console.log('jkuriger.js');

exports.jkuriger = function(req, res){
  console.log('jkuriger page')
  fs.readFile('./public/jkuriger.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good jkuriger fs');
      };
      var d = { mainBodyText: data};
      console.log('rendering jkuriger');
      res.render('jkuriger', d);
  });
};