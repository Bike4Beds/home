
/*
 * GET home page.
 */

var fs = require('fs'), 
  http = require('http');

console.log('index.js');

// exports.index = function(req, res){
//   console.log('index page')
//   fs.readFile('./public/MainBodyText.html', function (err, data) {
//     if (err) {
//       console.log('error w/ fs');
//     } else {
//       console.log('good index fs');
//       };
//       var d = { mainBodyText: data};
//       console.log('rendering index');
//       res.render('index', d);
//   });
// };


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
      // var options = {
      //   host: 'graph.facebook.com',
      //   path: '/19292868552',
      //   method: 'GET'
      // };
      var fb;
      var pic1;
      var pic2;
      // callback = function(response) {
      //   var str = ''
      //    response.on('data', function (chunk) {
      //      str += chunk;
      //      //console.log('str');
      //    });
        //function fb_like();  
        //response.on('end', function () {
          //var data1 = JSON.parse(str);
          //console.log(str);
          //fb = data1.likes;
          //pic1 =  '<img src="/img/akouasGirls.jpg"></img>';
          //pic2 =  '<img src="/img/CavaillonGirlsWallb.jpg"></img>';
          //fbLink = ''
          //fbLink = 'http://www.facebook.com/pages/Bike4Beds/205247346165797'          
          //var d = {mainBodyText: data, picture1: pic1, picture2: pic2};
          var d = {mainBodyText: data};
          //console.log(d);
          res.render('index', d);
         //});
      //}

    //http.request(options, callback).end();

    };
  });
};



   
