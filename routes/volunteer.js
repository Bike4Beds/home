/*
 * GET "Volunteer" page.
 */
 

 var fs = require('fs'), 
  http = require('http');

console.log('volunteer.js');

exports.volunteer = function(req, res){
  console.log('volunteer page')
  fs.readFile('./public/volunteer.html', function (err, data) {
    if (err) {
      console.log('error w/ fs');
    } else {
      console.log('good volunteer fs');
      //console.log(bikersListItems);
    };
    //var Pledge = mongoose.model('Pledge', Pledge);

    var d = { mainBodyText: data, dataSave: '', 'error': err,
    'firstName': '',
    'lastName': '',
    'streetAddr': '',
    'city': '',
    'state': '',
    'zip': '',
    'phoneNbr': '',
    'email': '',
    'bikeEvent': '',
    'shirt': '' };
    //var d = { mainBodyText: data, stateList: ST}
    console.log('rendering volunteer');
    res.render('volunteer', d);



    });

  };
