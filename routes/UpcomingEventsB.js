/*
 * GET "UpcomingEventsB" page.
 */
 

 var fs = require('fs'), 
  http = require('http');

console.log('UpcomingEventsB.js');

exports.UpcomingEventsB = function(req, res){
  console.log('UpcomingEventsB page')
  fs.readFile('./public/UpcomingEventsB.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good UpcomingEventsB fs');
      };
      var d = { mainBodyText: data};
      console.log('rendering UpcomingEventsB');
      res.render('UpcomingEventsB', d);
  });
};