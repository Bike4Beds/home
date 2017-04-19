var fs = require('fs');
var http = require('http');

exports.index = function(req, res){
  fs.readFile('./public/MainBodyText.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good fs');
      //make http request here populate facebook likes with the call back
       var options = {
        host: '',
        path: '/19292868552',
        method: 'GET'
      };
      var fb;
      var pic1;
      var pic2;
      var d = {mainBodyText: data};

      res.render('index', d);

    };
  });
};



   
