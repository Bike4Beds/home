/*
 * GET "Bikes" page.
 */
 

 var fs = require('fs'), 
  http = require('http');

console.log('bikes.js');

exports.bikes = function(req, res){
  console.log('bikes page')
  fs.readFile('./public/bikes.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good bikes fs');
      };
      var d = { mainBodyText: data};
      console.log('rendering bikes');
      res.render('bikes', d);
  });
};


exports.bikes = function(req, res){
  console.log('bikes page')
  fs.readFile('./public/bikes.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good bikes fs');
      };
        var d = { mainBodyText: data};
        res.render('bikes', d);
  });
};
