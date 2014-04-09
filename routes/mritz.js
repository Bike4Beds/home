// mritz.js 

 var fs = require('fs'), 
  http = require('http');

console.log('mritz.js');

exports.mritz = function(req, res){
  console.log('mritz page')
  fs.readFile('./public/mritz.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good mritz fs');
      };
      var d = { mainBodyText: data};
      console.log('rendering mritz');
      res.render('mritz', d);
  });
};