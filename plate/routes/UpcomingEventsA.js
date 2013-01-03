/*
 * GET "UpcomingEventsA" page.
 */
 

 var fs = require('fs'), 
  http = require('http');

console.log('UpcomingEventsA.js');

exports.UpcomingEventsA = function(req, res){
  console.log('UpcomingEventsA page')
  fs.readFile('./public/UpcomingEventsA.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good UpcomingEventsA fs');
      };
      var d = { mainBodyText: data};
      console.log('rendering UpcomingEventsA');
      res.render('UpcomingEventsA', d);
  });
};

exports.UpcomingEventsA = function(req, res){
  console.log('UpcomingEventsA page')
  fs.readFile('./public/UpcomingEventsA.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good UpcomingEventsA fs');
      };
        var d = { mainBodyText: data};
        res.render('UpcomingEventsA', d);
  });
};
