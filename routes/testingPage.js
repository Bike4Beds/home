/*
 * GET "testingPage" page.
 */
 

 var fs = require('fs'), 
  http = require('http');

console.log('testingPage.js');

exports.testingPage = function(req, res){
  console.log('testingPage page')
  fs.readFile('./public/testingPage.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good testingPage fs');
      };
      var d = { mainBodyText: data};
      console.log('rendering testingPage');
      res.render('testingPage', d);
  });
};