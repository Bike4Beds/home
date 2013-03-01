var $ = require('jquery'),
    modal = require('jquery').modal;

var mongoose = require('mongoose'),
    validate = require('mongoose-validator').validate;

mongoose.connect('mongodb://localhost/27017');

// require('mongoose-validator').extend('isAlphanumeric', function () {
//     console.log('matt' + this.str);
//     return this.str == validate('isAlphanumeric');
// }, 'Only characters and numbers are allowed');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var firstNameValidator  = [validate('len', 2, 50), validate('isAlphanumeric')];  
var lastNameValidator   = [validate('len', 2, 50), validate('isAlphanumeric')];  
var streetAddrValidator = [validate('len', 2, 100)]; // validate('isAlphanumeric' || 'is(/^[ ]+$/)')];  
var cityValidator       = [validate('len', 2, 50), validate('isAlphanumeric')];  
var stateValidator      = [validate('len', 2, 50), validate('isAlphanumeric')];  
var zipValidator        = [validate('len', 4, 10)]; //, validate('isNumeric')];  //validate('postalCode')];
var phoneNbrValidator   = [validate('len', 2, 20)];  //, validate('isAlphanumeric')];  
var emailValidator      = [validate('len', 6, 64), validate('isEmail')];
var amountValidator     = [validate('len', 2, 10), validate('isNumeric')];


//| validate(is(/^[ ]+$/))

var Pledge = new Schema({
      firstName  : {type: String, required: true, validate: firstNameValidator}
    , lastName   : {type: String, required: true, validate: lastNameValidator}
    , streetAddr : {type: String, required: true, validate: streetAddrValidator}
    , city       : {type: String, required: true, validate: cityValidator}
    , state      : {type: String, required: true, validate: stateValidator} 
    , zip        : {type: Number, required: true, validate: zipValidator}
    , phoneNbr   : {type: String, required: true, validate: phoneNbrValidator}
    , email      : {type: String, required: true, validate: emailValidator}  
    , bikeEvent  : {type: String, required: false}
    , biker      : {type: String, required: false}
    , createDt   : Date
});

var Bike = new Schema({
      firstName     : {type: String,  required: true, validate: firstNameValidator}
    , lastName      : {type: String,  required: true, validate: lastNameValidator}
    , streetAddr    : {type: String,  required: true, validate: streetAddrValidator}
    , city          : {type: String,  required: true, validate: cityValidator}
    , state         : {type: String,  required: true, validate: stateValidator} 
    , zip           : {type: Number,  required: true, validate: zipValidator}
    , phoneNbr      : {type: String,  required: true, validate: phoneNbrValidator}
    , email         : {type: String,  required: true, validate: emailValidator}  
    , bikeEvent     : {type: String,  required: true}
    , agreement     : {type: Boolean, required: true}
    , overSixteen   : {type: Boolean, required: true}
    , birthdate     : {type: String,  required: false}
    , signature     : {type: String,  required: true}
    , shirt         : {type: String,  required: true}
    , sponsorship   : {type: String,  required: false} 
    , stripeToken   : {type: String,  required: false}
    , amount        : {type: Number,  required: true, validate: amountValidator}
    , paymentType   : {type: String,  required: false}
    , createDt      : Date
});

mongoose.model('Pledge', Pledge);
var Pledge = mongoose.model('Pledge');

mongoose.model('Bike', Bike);
var Bike = mongoose.model('Bike');

dbCalls = function(req, res){};
//dbCallsBike = function(req, res){};
console.log('dbCalls')


//Create a new post
dbCalls.prototype.save = function(params, callback) {
  var pledge = new Pledge({
        firstName:  params['firstName'], 
        lastName:   params['lastName'],
        streetAddr: params['streetAddr'],
        city:       params['city'],
        state:      params['state'],
        zip:        params['zip'],
        email:      params['email'],
        phoneNbr:   params['phoneNbr'], 
        bikeEvent:  params['bikeEvent'],
        biker:      params['biker'],
        createDt:   new Date()});
    pledge.save(function (err) {
      if (err) {
        console.log('error dbcalls');
        callback(err, 'failed');
      } else {
        //fv.showLoginError('Login Failure', 'Please check that all of your fields have data');
        callback(null, 'saved correctly');
        console.log(params['email'])
        console.log('email test')
        //sendConfirmEmail(params['email']);
    }
  });
};

//Create a new post
dbCalls.prototype.saveBike = function(params, callback) {
  var bike = new Bike({
        firstName:     params['firstName'], 
        lastName:      params['lastName'],
        streetAddr:    params['streetAddr'],
        city:          params['city'],
        state:         params['state'],
        zip:           params['zip'],
        email:         params['email'],
        phoneNbr:      params['phoneNbr'], 
        bikeEvent:     params['bikeEvent'],
        agreement:     params['agreement'],
        overSixteen:   params['overSixteen'],
        birthdate:     params['birthdate'],
        signature:     params['signature'],
        shirt:         params['shirt'],
        sponsorship:   params['sponsorship'],
        stripeToken:   params['stripeToken'],
        amount:        params['amount'],
        paymentType:   params['paymentType'],
        createDt:   new Date()});
    rowId = bike.save(function (err) {
      if (err) {
        console.log('error bike save dbcalls');
        callback(err, 'failed');
      } else {
        //fv.showLoginError('Login Failure', 'Please check that all of your fields have data');
        callback(null, 'saved correctly');
        console.log(params['email'])
        console.log('email test')
        //sendConfirmEmail(params['email']);
    }
    console.log('Bike Row Id: ' + rowId);
  });
};


dbCalls.prototype.getBikerList = function( params, callback){
  console.log('test getBikerList:');
  //console.log(callback);
  Bike.find({bikeEvent: params}, {firstName: 1, lastName: 1, _id: 0}, function (error, bikersList) {  
         if(error){
          console.log('Error from dbcalls getBikerList')
          callback(error);
         }else{ 
           console.log('bikerList from dbcalls' + bikersList);
           callback(error, bikersList);
         }
  });
};


dbCalls.prototype.sendConfirmEmail = function(emailParm, form, paymentType, event){
  var email   = require("./node_modules/emailjs/email");
  if (paymentType = 'Credit Card') {
    body = 'Thank you for signing up for the Bike4Beds ' + event + '.' + '\n\n' +
          ' Your payment of: $' + amount + ' was received.' + '\n\n' +
          '' + '\n\n' +
          ' Thank You' + '\n\n' +
          ' Matt Ritz'
  } else { if (paymentType = 'Check'){
      body = 'Check payment'
    }
  }
  var server  = email.server.connect({
     user:    "bikeforbeds", 
     password:"bike4beds100", 
     host:    "smtp.gmail.com", 
     ssl:     true

  });

  // send the message and get a callback with an error or details of the message that was sent
  server.send({
     text:    body, 
     from:    "bike4beds <bikeforbeds@gmail.com>", 
     to:      emailParm,
     //cc:      "else <else@gmail.com>",
     subject: 'Bike4Beds'
  }, function(err, message) { console.log(err || message); });

};




// exports.bikers = function(bikers,callback){
//  mongoose.once('open', function(){
//   var bikersSchema = new mongoose.Schema({
//    bikers: String,
//   });
//   console.log('export bikers');
//   var Team = db.model('Pledge', bikersSchema);
//   Team.find({'lastName':bikers}, function (err, bikers) {
//    if(err){
//     onErr(err,callback);
//    }else{
//     mongoose.connection.close();
//     console.log('bikers');
//     callback("",bikers);
//    }
//   })// end Team.find
//  });// end db.once open
// };




// //Find all posts
// PostProvider.prototype.findAll = function(callback) {
//   Post.find({}, function (err, posts) {
//     callback( null, posts )
//   });  
// };

// //Find post by ID
// PostProvider.prototype.findById = function(id, callback) {
//   Post.findById(id, function (err, post) {
//     if (!err) {
// 	  callback(null, post);
// 	}
//   });
// };

// //Update post by ID
// PostProvider.prototype.updateById = function(id, body, callback) {
//   Post.findById(id, function (err, post) {
//     if (!err) {
// 	  post.title = body.title;
// 	  post.body = body.body;
// 	  post.save(function (err) {
// 	    callback();
// 	  });
// 	}
//   });
// };

// //Create a new post
// PostProvider.prototype.save = function(params, callback) {
//   var post = new Post({title: params['title'], body: params['body'], created_at: new Date()});
//   post.save(function (err) {
//     callback();
//   });
// };

// //Add comment to post
// PostProvider.prototype.addCommentToPost = function(postId, comment, callback) {
//   this.findById(postId, function(error, post) {
//     if(error){
// 	  callback(error)
// 	}
//     else {
// 	  post.comments.push(comment);
// 	  post.save(function (err) {
// 	    if(!err){
// 		  callback();
// 	    }	
// 	  });
//     }
//   });
// };

exports.dbCalls = dbCalls;
