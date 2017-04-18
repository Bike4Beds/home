var mongoose = require('mongoose');
var validate = require('mongoose-validator').validate;

var uri = process.env.MONGODB_URI;

mongoose.connect(uri, function(err){
  if (err) {
    console.log('Mongoose Connection Error: ' + err);
  }
});

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;
var objectId = new ObjectId();

var firstNameValidator  = [validate({message: "First Name length is to long"},'len', 1, 50)];
var lastNameValidator   = [validate({message: "Last Name length is to long"},'len', 1, 50)];
var streetAddrValidator = [validate({message: "Street Address length is to long"},'len', 1, 100)]; // validate('isAlphanumeric' || 'is(/^[ ]+$/)')];
var cityValidator       = [validate({message: "City length is to long"},'len', 1, 50)];
var stateValidator      = [validate({message: "State length is incorrect"},'len', 2, 50)];
var zipValidator        = [validate({message: "Zip length is to long"},'len', 4, 10), validate('isNumeric')];
var phoneNbrValidator   = [validate({message: "Phone Number length is to long"},'len', 1, 20)];  //, validate('isAlphanumeric')];
var emailValidator      = [validate({message: "Email Address length is not correct"},'len', 5, 64), validate({message: "Email Address is not correct"},'isEmail')];
var amountValidator     = [validate('len', 1, 10), validate('isNumeric')];

var Pledge = new Schema({
      firstName     : {type: String, required: true, validate: firstNameValidator}
    , lastName      : {type: String, required: true, validate: lastNameValidator}
    , streetAddr    : {type: String, required: true, validate: streetAddrValidator}
    , city          : {type: String, required: true, validate: cityValidator}
    , state         : {type: String, required: true, validate: stateValidator}
    , zip           : {type: Number, required: true, validate: zipValidator}
    , phoneNbr      : {type: String, required: true, validate: phoneNbrValidator}
    , email         : {type: String, required: true, validate: emailValidator}
    , bikeEvent     : {type: String, required: false}
    , biker         : {type: String, required: false}
    , amount        : {type: Number,  required: true, validate: amountValidator }
    , paymentType   : {type: String,  required: false}
    , paymentStatus : {type: String,  required: false}
    , createDt      : Date
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
    , bikeRoute     : {type: String,  required: true}
    , transportation : {type: String,  required: true}
    , agreement     : {type: Boolean, required: true}
    , overSixteen   : {type: Boolean, required: true}
    , birthdate     : {type: String,  required: false}
    , signature     : {type: String,  required: true}
    , shirt         : {type: String,  required: true}
    , sponsorship   : {type: String,  required: false}
    , amount        : {type: Number,  required: true, validate: amountValidator}
    , paymentType   : {type: String,  required: false}
    , paymentStatus : {type: String,  required: false}
    , couponCode    : {type: String, required: false}
    , coupon        : {type: Number,  required: false}
    , amountEnt     : {type: Number, required: false}
    , createDt      : Date
});

var Volunteer = new Schema({
      firstName     : {type: String, required: true, validate: firstNameValidator}
    , lastName      : {type: String, required: true, validate: lastNameValidator}
    , streetAddr    : {type: String, required: true, validate: streetAddrValidator}
    , city          : {type: String, required: true, validate: cityValidator}
    , state         : {type: String, required: true, validate: stateValidator}
    , zip           : {type: Number, required: true, validate: zipValidator}
    , phoneNbr      : {type: String, required: true, validate: phoneNbrValidator}
    , email         : {type: String, required: true, validate: emailValidator}
    , bikeEvent     : {type: String, required: false}
    , shirt         : {type: String, required: true}
    , createDt      : Date
});

mongoose.model('Pledge', Pledge);
var Pledge = mongoose.model('Pledge');

Bike.statics.findAndModify = function (query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback);
};

mongoose.model('Bike', Bike);
var Bike = mongoose.model('Bike');

mongoose.model('Volunteer', Volunteer);
var Volunteer = mongoose.model('Volunteer');

dbCalls = function(req, res){};

//Create a new post
dbCalls.prototype.save = function(params, callback) {
  var pledge = new Pledge({
        firstName:     params['firstName'],
        lastName:      params['lastName'],
        streetAddr:    params['streetAddr'],
        city:          params['city'],
        state:         params['state'],
        zip:           params['zip'],
        email:         params['email'],
        phoneNbr:      params['phoneNbr'],
        bikeEvent:     params['bikeEvent'],
        bikeRoute:     params['bikeRoute'],
        transportation: params['transportation'],
        biker:         params['biker'],
        amount:        params['amount'],
        paymentType:   params['paymentType'],
        paymentStatus: params['paymentStatus'],
        createDt:   new Date()});
    pledge.save(function (err) {
      if (err) {
        console.log('error dbcalls');
        console.log('dbcalls: ' + err);
        callback(err, 'failed');
      } else {
        console.log('Pledge Row Id: ' + pledge.id);
        callback(null, 'saved correctly', pledge.id);
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
        bikeRoute:     params['bikeRoute'],
        transportation: params['transportation'],
        agreement:     params['agreement'],
        overSixteen:   params['overSixteen'],
        birthdate:     params['birthdate'],
        signature:     params['signature'],
        shirt:         params['shirt'],
        sponsorship:   params['sponsorship'],
        amount:        params['amount'],
        paymentType:   params['paymentType'],
        paymentStatus: params['paymentStatus'],
        couponCode:    params['couponCode'],
        coupon:        params['coupon'],
        amountEnt:     params['amountEnt'],
        createDt:   new Date()});
    rowId = bike.save(function (err) {
      if (err) {
        console.log('error bike save dbcalls');
        callback(err, 'failed', '');
      } else {
        console.log('Bike Row Id: ' + bike.id);
        callback(null, 'saved correctly', bike.id);
    }

  });
};


//Create a new post
dbCalls.prototype.saveVolunteer = function(params, callback) {

  var volunteer = new Volunteer({
        firstName:     params['firstName'],
        lastName:      params['lastName'],
        streetAddr:    params['streetAddr'],
        city:          params['city'],
        state:         params['state'],
        zip:           params['zip'],
        email:         params['email'],
        phoneNbr:      params['phoneNbr'],
        bikeEvent:     params['bikeEvent'],
        shirt:         params['shirt'],
        createDt:   new Date()});
    volunteer.save(function (err) {
      if (err) {
        console.log('error dbcalls');
        callback(err, 'failed');
      } else {
        console.log('Volunteer Row Id: ' + volunteer.id);
        callback(null, 'saved correctly', volunteer.id);
    }
  });
};


//update the paymentStatus after a credit card payment is made
dbCalls.prototype.updatePaymentStatusBikes = function(rowId){
  console.log('updating the payment status');

  Bike.findById(rowId, function(err, biker) {
    if (err) {
      condole.log('findById error');
    } else {
      biker.paymentStatus = "Paid";

      biker.save(function(err) {
        if (err)
          console.log('biker update payment status error');
        else
          console.log('biker update payment status success');
      });
    };
  });
};

//update the paymentStatus after a credit card payment is made
dbCalls.prototype.updatePaymentStatusPledge = function(rowId){
  console.log('updating the pledger payment status');

  Pledge.findById(rowId, function(err, pledger) {
    if (err) {
      condole.log('findById error');
    } else {
      pledger.paymentStatus = "Paid";

      pledger.save(function(err) {
        if (err)
          console.log('pledger update payment status error');
        else
          console.log('pledger update payment status success');
      });
    };
  });
};

dbCalls.prototype.getBikerList = function( params, callback){
  console.log('test getBikerList:' + params);

  var options = {
    "sort": [['lastName','ascending'],['firstName','ascending']]
  };

  /*params*/
  Bike.find({bikeEvent: params}, {firstName: 1, lastName: 1, _id: 0}, options, function (error, bikersList) {
         if(error){
          console.log('Error from dbcalls getBikerList: ' + error)
          callback(error);
         }else{
           console.log('bikerList from dbcalls:' + bikersList);
           callback(error, bikersList);
         }
  });
};

exports.dbCalls = dbCalls;
