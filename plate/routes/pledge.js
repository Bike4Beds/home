/*
 * GET "Pledge" page.
 */
 

 var fs = require('fs'), 
  http = require('http');

console.log('pledge.js');


exports.pledge = function(req, res){
  console.log('pledge page')
  fs.readFile('./public/pledge.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good pledge fs');
      };
      var d = { mainBodyText: data};
      console.log('rendering pledge');
      res.render('pledge', d);
  });
};


// exports.bikes = function(req, res){
//   console.log('bikes page')
//   fs.readFile('./public/bikes.html', function (err, data) {
//     if (err) {
//       console.log('error w/ fs');
//     } else {
//       console.log('good bikes fs');
//       };
//         var d = { mainBodyText: data};
//         res.render('bikes', d);
//   });
// };
