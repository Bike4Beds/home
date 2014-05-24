// members.js

 var fs = require('fs'), 
  http = require('http');

console.log('members.js');

exports.members = function(req, res){
  console.log('members page')
  fs.readFile('./public/members.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good members fs');
      };
      var d = { mainBodyText: data};
      console.log('rendering members');
      res.render('members', d);
  });
};