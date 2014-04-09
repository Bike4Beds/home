// akouaenow.js

 var fs = require('fs'), 
  http = require('http');

console.log('akouaenow.js');

exports.akouaenow = function(req, res){
  console.log('akouaenow page')
  fs.readFile('./public/akouaenow.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good akouaenow fs');
      };
      var d = { mainBodyText: data};
      console.log('rendering akouaenow');
      res.render('akouaenow', d);
  });
};