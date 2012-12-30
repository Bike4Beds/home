
/*
 * GET home page.
 */

var fs = require('fs'), 
  http = require('http');

console.log('index.js');


exports.index = function(req, res){
  fs.readFile('./public/MainBodyText.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good fs');
      //make http request here populate facebook likes with the call back
      var options = {
        host: 'graph.facebook.com',
        path: '/19292868552',
        method: 'GET'
      };
      var fb;
      var pic1;
      var pic2;
      callback = function(response) {
        var str = ''
        response.on('data', function (chunk) {
          str += chunk;
          console.log('str');
        });
        //function fb_like();  
        response.on('end', function () {
          var data1 = JSON.parse(str);
          console.log(str);
          fb = data1.likes;
          pic1 =  '<img src="/img/akouasGirls.jpg"></img>';
          pic2 =  '<img src="/img/CavaillonGirlsWallb.jpg"></img>';
          fbLink = 'http://www.facebook.com/pages/Bike4Beds/205247346165797'
          var d = {mainBodyText: data, facebookLikes: fb, picture1: pic1, picture2: pic2};
          console.log(d);
          res.render('index', d);
         });
      }

    http.request(options, callback).end();

    }
  });
};



// fb_like(d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) return;
//   js = d.createElement(s); js.id = id;
//   js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
//   fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));



/*
 * GET bikes page.
 */

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

   

 // $('.dropdown-toggle').dropdown()