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
var streetAddrValidator = [validate('len', 2, 100), validate('isAlphanumeric' || 'is(/^[ ]+$/)')];  
var cityValidator       = [validate('len', 2, 50), validate('isAlphanumeric')];  
var stateValidator      = [validate('len', 2, 50), validate('isAlphanumeric')];  
var zipValidator        = [validate('len', 4, 10), validate('isNumeric')];  //validate('postalCode')];
var phoneNbrValidator   = [validate('len', 2, 20), validate('isAlphanumeric')];  
var emailValidator      = [validate('len', 6, 64), validate('isEmail')];


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
    , createDt   : Date
});

mongoose.model('Pledge', Pledge);
var Pledge = mongoose.model('Pledge');

dbCalls = function(req, res){};


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
        createDt:   new Date()});
    pledge.save(function (err) {
      if (err) {
        console.log('error dbcalls');
        callback(err, 'failed');
      } else {
        //fv.showLoginError('Login Failure', 'Please check that all of your fields have data');
        callback(null, 'saved correctly');
        sendConfirmEmail();
    }
  });
};

sendConfirmEmail = function(){
  var email   = require("./node_modules/emailjs/email");
  var server  = email.server.connect({
     user:    "bikeforbeds", 
     password:"bike4beds100", 
     host:    "smtp.gmail.com", 
     ssl:     true

  });

  // send the message and get a callback with an error or details of the message that was sent
  server.send({
     text:    "i hope this works", 
     from:    "bike4beds <bikeforbeds@gmail.com>", 
     to:      "matt <mattritz229@yahoo.com>",
     //cc:      "else <else@gmail.com>",
     subject: "testing emailjs"
  }, function(err, message) { console.log(err || message); });

};

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
