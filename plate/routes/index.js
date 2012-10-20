
/*
 * GET home page.
 */

var fs = require('fs');
console.log('index.js');

exports.index = function(req, res){
  fs.readFile('./public/MainBodyText.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good fs');
      var d = { mainBodyText: data};
      res.render('index', d);
    }
  });
};

/*
 * GET support page.
 */
exports.support = function(req, res){
  var locals = { title: 'Support', bodyClass:'support' };
  res.render('support', locals);
};



 //$('.dropdown-toggle').dropdown()