// Send Email

sendEmail = function(req, res){};


sendEmail.prototype.sendPrePledgeEmail = function(req, res){
  var email       = require("./node_modules/emailjs/email");
  var lastname    = req.param('lastName');
  var firstname   = req.param('firstName');
  var emailParm   = req.param('email');
  var subject     = 'Bike4Beds Pledge'

  //var amount      = req.param('amount');
  //subject += subject + ' ' + amount

  body = 'Thank you ' + firstname + ' ' + lastname + ' for supporting Bike4Beds. '+
          ' You will be receiving an email confirmation shortly.'  +
          ' Please email questions to: info@bike4beds.org or BikeforBeds@gmail.com' + '\n' +
          'or call 610-791-1067 and ask for Matt' + '\n' +
          '' + '\n\n' +
          ' Thank You' + '\n' +
          ' Matt Ritz'

    sendConfirmEmail(subject, body, emailParm);
    res.send(200);
};

sendEmail.prototype.sendPreBikeEmail = function(req, res){
  console.log('sendPreBikeEmail');

  var email       = require("./node_modules/emailjs/email");
  var lastname    = req.param('lastName');
  var firstname   = req.param('firstName');
  var emailParm   = req.param('email');
  var subject     = 'Bike4Beds Signup'
  var bikeEvent   = req.param('bikeEvent');

  body = 'Thank you ' + firstname + ' ' + lastname + ' for signing up for our ' +
          bikeEvent + ' Bike4Beds event. '+
          ' You will be receiving an email confirmation shortly.'  +
          ' Please email questions to: info@bike4beds.org or BikeforBeds@gmail.com' + '\n' +
          'or call 610-791-1067 and ask for Matt' + '\n' +
          '' + '\n\n' +
          ' Thank You' + '\n' +
          ' Matt Ritz'

  console.log('building the email body: ' + emailParm);
  sendConfirmEmail(subject, body, emailParm);
  res.send(200);
};

sendEmail.prototype.sendConfirmEmailPledge = function(req){
  var email       = require("./node_modules/emailjs/email");
  var amount      = req.param('amount');
  var paymentType = req.param('paymentType');
  var biker       = req.param('biker');
  var emailParm   = req.param('email');
  var bikeEvent   = req.param('bikeEvent');
  var subject     = 'Bike4Beds'

  console.log('sendEmail PaymentType:' + paymentType);
  if (paymentType == 'creditCard') {
    console.log('sendEmail credit card');
    body = 'Thank you for your generous donation for the Bike4Beds. \n'
    if (typeof(biker)!== 'undefined')  {
      body += 'You have chosen to sponsor ' + biker +  ' for the ' + bikeEvent + ' event.' + '\n\n'
    };
    subject += ' - Payment Received'
    body += ' Your payment of: $' + amount + ' was received.' + '\n\n' +
          'Please email questions to: info@bike4beds.org or BikeforBeds@gmail.com' + '\n' +
          'or call 610-791-1067 and ask for Matt' + '\n' +
          '' + '\n\n' +
          ' Thank You' + '\n' +
          ' Matt Ritz'
  } else { if (paymentType == 'Check'){
    console.log('sendEmail check');
    subject += ' - Thank you for your pledge'
    body = 'Thank you for your generous pledge for the Bike4Beds. '
    if (typeof(biker)!== 'undefined')  {
      body += 'You have chosen to sponsor ' + biker +  ' for the ' + bikeEvent + ' event.' + '\n\n'
    };
    body += ' Please make the check out to Bike4Beds and mail your payment of $' + amount + ' to:' + '\n\n' +
            ' Bike4Beds' + '\n' +
            ' c/o Matt Ritz' + '\n' +
            ' 229 Mountain Park Road' + '\n' +
            ' Allentown, PA 18103' + '\n\n' +
            'Please email questions to: info@bike4beds.org or BikeforBeds@gmail.com' + '\n' +
            'or call 610-791-1067 and ask for Matt' + '\n' +
            '' + '\n\n' +
            ' Thank You' + '\n\n' +
            ' Matt Ritz'
    }
  }
    console.log('building the email body: ' + emailParm);
    sendConfirmEmail(subject, body, emailParm);
};

sendEmail.prototype.sendConfirmEmailBikes = function(req){
  var amount      = req.param('amount');
  var paymentType = req.param('paymentType');
  var bikeEvent   = req.param('bikeEvent');
  var emailParm   = req.param('email');
  var subject     = 'Bike4Beds'
  var body        = ''

  console.log('sendEmail PaymentType:' + paymentType);
  if (paymentType == 'creditCard') {
    console.log('sendEmail credit card');
    subject += ' - Payment Received'
    body = 'Thank you for signing up for the Bike4Beds ' + bikeEvent + ' event.' + '\n\n' +
          ' Your payment of: $' + amount + ' was received.' + '\n\n' +
          'Please email questions to: info@bike4beds.org or BikeforBeds@gmail.com' + '\n' +
          'or call 610-791-1067 and ask for Matt' + '\n' +
          '' + '\n\n' +
          ' Thank You' + '\n' +
          ' Matt Ritz'
  } else { if (paymentType == 'Check'){
      console.log('sendEmail check');
      subject += ' - Registration details'
      body = 'Thank you for signing up for the Bike4Beds ' + bikeEvent + ' event.' + '\n\n' +
          ' Please make the check out to Bike4Beds and mail your payment of $' + amount + ' to:' + '\n\n' +
          ' Bike4Beds' + '\n' +
          ' c/o Matt Ritz' + '\n' +
          ' 229 Mountain Park Road' + '\n' +
          ' Allentown, PA 18103' + '\n\n' +
          'Please email questions to: info@bike4beds.org or BikeforBeds@gmail.com' + '\n' +
          'or call 610-791-1067 and ask for Matt' + '\n' +
          '' + '\n\n' +
          ' Thank You' + '\n\n' +
          ' Matt Ritz'
    }
  }

  sendConfirmEmail(subject, body, emailParm);
};

sendEmail.prototype.sendConfirmEmailVolunteer = function(req){
  var bikeEvent   = req.param('bikeEvent');
  var emailParm   = req.param('email');
  var subject     = 'Bike4Beds - Thank you for volunteering'
  var body        = ''

  console.log('building the email body: ' + emailParm);

  body = 'Thank you for signing up to volunteer for the Bike4Beds ' + bikeEvent + ' event.' + '\n\n' +
        'Bike4Beds would not be able to put on events with out the help of volunteers.' + '\n\n' +
        'Please email questions to: info@bike4beds.org or BikeforBeds@gmail.com' + '\n' +
        'or call 610-791-1067 and ask for Matt' + '\n' +
        '' + '\n\n' +
        ' Thank You' + '\n' +
        ' Matt Ritz'

  sendConfirmEmail(subject, body, emailParm);
};


function sendConfirmEmail(subject, body, emailParm) {
  console.log('sendEmail sendConfirmEmail');
  var email = require("./node_modules/emailjs/email");
  var server  =    email.server.connect({
     user:    "bikeforbeds",
     password: process.env.EMAIL_PSWD,
     host:    "smtp.gmail.com",
     ssl:     true,
     port : 465
    });

    // send the message and get a callback with an error or details of the message that was sent
    server.send({
       text:    body,
       from:    "bike4beds <bikeforbeds@gmail.com>",
       to:      emailParm,
       cc:      "bike4beds <bikeforbeds@gmail.com>",
       subject: subject
    }, function(err, message) { console.log(err || message); });
};

exports.sendEmail = sendEmail;
