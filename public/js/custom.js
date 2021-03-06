// $(document).ready(function(){
//   console.log('overwriting carousel to make sure its being called');
//   $('#mycarousel').carousel({interval: 6000});
//   $('ul.nav > li').click(function (e) {
//     e.preventDefault();
//     $('ul.nav > li').removeClass('active');
//     $(this).addClass('active');
//   });
// });


$('#mycarousel').carousel({
  interval: 6000 // in milliseconds
})

$('#mycarousel2').carousel({
  interval: 6000 // in milliseconds
})

$('#mycarouselBikes').carousel({
  interval: 6000 // in milliseconds
})



var _state;
$(document).ready(function(){
  var env = $('#env').val();
  if (env=='development') {
    console.log('setStripe env: ' + env);
    publicStripeApiKey = 'pk_test_iJZ2F2cUTwotuyV2OH6VHThg';
  } else {
    console.log('setStripe env: ' + env);
    publicStripeApiKey = 'pk_live_w49q3QEzfoJf8p9ITjBIjuwt';
  }
  Stripe.setPublishableKey(publicStripeApiKey);



  $(function() {
    $( "#tabs" ).tabs();
  });

 $('#mycarousel3').addClass('hoverClassAkouaPic');
 $('#mycarousel4').load('/akouaenow.html');

 $('#mattRitzPic').click(function(e){
    clearCarouselPics();
    $('#mycarousel3').addClass('hoverClassMattPic');
    $('#mycarousel4').load('/mattRitz.html');
  });

 $('#JessicaPic').click(function(e){
    clearCarouselPics();
    $('#mycarousel3').addClass('hoverClassJessicaPic');
    $('#mycarousel4').load('/jritz.html');
  });

 $('#KomlanPic').click(function(e){
    clearCarouselPics();
    $('#mycarousel3').addClass('hoverClassKomlanPic');
    $('#mycarousel4').load('/komlanLonergan.html');
  });

  $('#AkouaPic').click(function(e){
    clearCarouselPics();
    $('#mycarousel3').addClass('hoverClassAkouaPic');
    $('#mycarousel4').load('/akouaenow.html');
  });

  $('#AlaricePic').click(function(e){
    clearCarouselPics();
    $('#mycarousel3').addClass('hoverClassAlaricePic');
    $('#mycarousel4').load('/alariceLonergan1.html');
  });

  $('#BobPic').click(function(e){
    clearCarouselPics();
    $('#mycarousel3').addClass('hoverClassBobPic');
    $('#mycarousel4').load('/bobOconnor1.html');
  });

  $('#JoePic').click(function(e){
    clearCarouselPics();
    $('#mycarousel3').addClass('hoverClassJoePic');
    $('#mycarousel4').load('/joeKuriger.html');
  });

  $('#lewisRitzPic').click(function(e){
    clearCarouselPics();
    $('#mycarousel3').addClass('hoverClassName3');
    $('#mycarousel4').load('/lewisRitz.html');
  });

 $('#donLonerganPic').click(function(e){
    clearCarouselPics();
    $('#mycarousel3').addClass('hoverClassName');
    $('#mycarousel4').load('/donLonergan.html');
  });

  $('#jayBoylePic').click(function(e){
    clearCarouselPics();
    $('#mycarousel3').addClass('hoverClassName2');
    $('#mycarousel4').load('/jayBoyle.html');
  });


  function clearCarouselPics() {
    $('#mycarousel3').removeClass('hoverClassName');
    $('#mycarousel3').removeClass('hoverClassName1');
    $('#mycarousel3').removeClass('hoverClassName2');
    $('#mycarousel3').removeClass('hoverClassName3');
    $('#mycarousel3').removeClass('hoverClassMattPic');
    $('#mycarousel3').removeClass('hoverClassJessicaPic');
    $('#mycarousel3').removeClass('hoverClassKomlanPic');
    $('#mycarousel3').removeClass('hoverClassAkouaPic');
    $('#mycarousel3').removeClass('hoverClassAlaricePic');
    $('#mycarousel3').removeClass('hoverClassJoePic');
    $('#mycarousel3').removeClass('hoverClassBobPic');
  }

  //  ---------
  jQuery(function($){
     $("#birthDate").mask("99/99/99?99",{placeholder:" "});
     $("#zip").mask("99999");
     $("#amount").mask("9?99999",{placeholder:" "});
     $("#phoneNbr").mask("(999) 999-9999");
  });

 //sendEmail
  function sendPledgeEmail(){
    console.log('postPledgeEmail');
    $.ajax({
      type: "POST",
      url: '/pledge/preEmail',
      data: $('#pledge-form').serialize(),
      success: function(data){
         var loginErrors = $('.modal-alert');
         loginErrors.modal({ show : false, keyboard : true, backdrop : true });
         showLoginError = function(t, m)
          {
            $('.modal-alert .modal-header h3').text(t);
            $('.modal-alert .modal-body p').text(m);
            loginErrors.modal('show');
          }
      },
      dataType: 'json'
    });
  };


  //postBikes Function
  function postPledge(){
    console.log('postPledge');
    $.ajax({
      type: "POST",
      url: '/pledge',
      data: $('#pledge-form').serialize(),
      success: function(data){
         console.log('ajax post returned success');
         //clearPledgeForm(document.getElementById('pledge-form').elements);
         var loginErrors = $('.modal-alert');
         loginErrors.modal({ show : false, keyboard : true, backdrop : true });
         showLoginError = function(t, m)
          {
            $('.modal-alert .modal-header h3').text(t);
            $('.modal-alert .modal-body p').text(m);
            loginErrors.modal('show');
          }
         var validateForm = function validateForm()
          {
            if (data.dataSave == 'err' ){
              console.log('showloginerrors');
              console.log(data.error);
              var message = '';
              console.log(data.error.substring(0,16) );
              //Data Validation Errors
              if (data.error.substring(0,6) == 'Error:'){
              //if (data.error.name.substring(0,12) !== 'Credit Card:'){
                //$.each(data.error., function(i,e){
                //  message += data.error.message + '\n ';
                //});
                console.log('data.error');
                message = data.error;
              } else {
                //Stripe Errors - Remove token and show error
              if ($('#creditCard').is(':checked')){
                  $("#stripeToken").remove();
                }
                message = data.error.name;
              }
              showLoginError('Whoops!', message);
              return false;
            } else {
              document.getElementById('pledge-form').reset();
              clearPledgeForm(document.getElementById('pledge-form').elements, 'Pledge');
              if ($('#creditCard').is(':checked')){
                $("#stripeToken").remove();
              }
              showLoginError('Thank You', 'Thank You for making a pledge and supporting Bike4Beds. \n' +
                                           'A confirmation email has been sent to you. \n' +
                                           'Please email questions to: info@Bike4Beds.org \n' +
                                           'or call Matt at (610) 791-1067.');
              return true;
            }
          }
          validateForm();
      },
      dataType: 'json'
    });
  };
  //Strip caller pop window
  function stripeResponseHandlerBikes() {
      var token = function(res){
        //console.log('Got token ID:', res.id);

        var form = $('#PLedge-form');
        $('<input>').attr({
          type: 'hidden',
          id: 'stripeToken',
          name: 'stripeToken',
          value: res.id,
        }).appendTo('form');
          postPLedge(e);
      };

      StripeCheckout.open({
        key:         publicStripeApiKey,
        address:     false,
        amount:      $('#amount').val() * 100,
        name:        'BikeforBeds@gmail.com',
        description: 'Pledge',
        panelLabel:  'Checkout',
        token:       token
      }, stripeResponseHandlerBikes);

      return false;
     };


  //Pledge Form btn cliked
  $('#btn-login').click(function(e){
    e.preventDefault();
    var loginErrors = $('.modal-alert');
    loginErrors.modal({ show : false, keyboard : true, backdrop : true });
    showLoginError = function(t, m)
    {
      $('.modal-alert .modal-header h3').text(t);
      $('.modal-alert .modal-body p').text(m);
      loginErrors.modal('show');
    }

    var err = '';
    errMsg = validate_form_required_pledge(err);
    console.log('error msg: ' + errMsg.length);

    if (errMsg.length == 0){   //Make sure there are not any missing required fields
      //Amount Field -- Replace the $
      $('#amount').val($('#amount').val().replace(/.*\$/, ''));
      //Remove any decimal places
      $('#amount').val(parseFloat($('#amount').val()).toFixed(0));
      //Payment Type
      if ($('#creditCard').is(':checked')){
        $('#paymentType').val('creditCard');
        console.log('PaymentType: ' + $('#paymentType').val());
      } else {
        $('#paymentType').val('Check');
        console.log('PaymentType: ' + $('#paymentType').val());
      }


      if ($("#stripeToken").length){  //Already have a token, error return from server
          errMsg = postPLedge(err);
        } else {
          if ($('#creditCard').is(':checked')){  //Paying by Credit
            errMsg = sendPledgeEmail(err);
            errMsg = stripeResponseHandler();  // paying by credit card
          } else {
            errMsg = postPledge(err);  // paying by check
          }
        }
      } else {
      showLoginError('Whoops!', errMsg);
    }
  });


  //--------] Bikes [-----------

  $('#amountEnt').keyup(function () {
    CalcTotalAmt();
  });

  function CalcTotalAmt() {
    var amtEnt = $('[id="cc-amountEnt"]').val();
    console.log(amtEnt);
    var amtCp = $('[id="cc-coupon"]').val();
    console.log(amtCp);
    var amt = $('[id="cc-amount"]').val();
    console.log(amt);
    if ((+amtEnt + +amtCp) > 0) {
      $(':input[id="cc-amount"]').val(+amtEnt + +amtCp);
    } else {
      $(':input[id="cc-amount"]').val(0);
    }

    var amt = $('[id="cc-amount"]').val();
    AmtDisableEnable(amtEnt, amtCp, amt);
  }

  function CalcCoupon() {
    var amtEnt = $('[id="cc-amountEnt"]').val();
    var amtCp = $('[id="cc-coupon"]').val();
    var amt = $('[id="cc-amount"]').val();
    if ((+amtEnt + +amtCp) > 0) {
      $(':input[id="cc-amount"]').val(+amtEnt + +amtCp);
    } else {
      $(':input[id="cc-amount"]').val(0);
    }

    var amt = $('[id="cc-amount"]').val();
    AmtDisableEnable(amtEnt, amtCp, amt);
  }

  function AmtDisableEnable(amtEnt, amtCp, amt) {
    if (amtEnt < 50) {
      $('#btn-login-bikes').prop('disabled', true);
    }else {
      $('button').prop('disabled', false);
    }
    if (amt == 0) {
      $('#creditCard').attr('disabled',true);
      $('#check').prop('checked',true);
    } else {
      $('#creditCard').attr('disabled',false);
    }
  }


  //coupon button clicked
  $('#btn-couponCode').click(function(e){
    e.preventDefault();
    var loginErrors = $('.modal-alert');
    loginErrors.modal({ show : false, keyboard : true, backdrop : true });
    showLoginError = function(t, m)
    {
      $('.modal-alert .modal-header h3').text(t);
      $('.modal-alert .modal-body p').text(m);
      loginErrors.modal('show');
    }
    console.log('Test the coupon button');
    checkCoupon();
  });


  function checkCoupon(){
    console.log('checkCoupon');
    $.ajax({
      type: "Post",
      url: '/bikes/couponCode',
      data: {
        couponCode: $('[id="cc-couponCode"]').val()
        },
          success: function(data) {
            if (data.coupon < '0') {
              $(':input[id="cc-coupon"]').val(data.coupon);
              amtEnt = $('[id="cc-amountEnt"]').val();
            } else {
              alert("The Coupon Code entered is not valid.");
              $(':input[id="cc-coupon"]').val(data.coupon);
            }
            CalcCoupon();
          },
          error: function(data){
            alert("The Coupon Code entered is not valid.");
          }
    });
  };




    //console.log($('#amount').val());

 //sendEmail
  function sendEmail(){
    console.log('putBikesEmail');
    $.ajax({
      type: "Post",
      url: '/bikes/preEmail',
      data: $('#bikes-form').serialize(),
      dataType: 'json',
      success: function(data){
         console.log('ajax put returned success');
         var loginErrors = $('.modal-alert');
         loginErrors.modal({ show : false, keyboard : true, backdrop : true });
         showLoginError = function(t, m)
          {
            $('.modal-alert .modal-header h3').text(t);
            $('.modal-alert .modal-body p').text(m);
            loginErrors.modal('show');
          }
          return true;
      },
      error: function(data){
        console.log('ajax put returned error');
        },
      //,
      //dataType: 'json'
    });
  };


  //postBikes Function
  function postBikes(){
    console.log('postBikes');
    $.ajax({
      type: "POST",
      url: '/bikes',
      data: $('#bikes-form').serialize(),
      success: function(data){
         console.log('ajax post returned success');
         var loginErrors = $('.modal-alert');
         loginErrors.modal({ show : false, keyboard : true, backdrop : true });
         showLoginError = function(t, m)
          {
            $('.modal-alert .modal-header h3').text(t);
            $('.modal-alert .modal-body p').text(m);
            loginErrors.modal('show');
          }
         var validateForm = function validateForm()
          {
            if (data.dataSave == 'err' ){
              console.log('showloginerrors');
              var message = '';
              console.log(data);
              //Data Validation Errors
              if (data.error.message.length !== 0){
                //$.each(data.error., function(i,e){
                //  message += data.error.message + '\n ';
                //});
                message = data.error.message;
              } else {
                //Stripe Errors - Remove token and show error
                if ($('#creditCard').is(':checked')){
                  $("#stripeToken").remove();
                  message = data.error.name;
                  console.log('CustomJs Stipe Error');
                }
              }
              showLoginError('Whoops!', message);
              return false;
            } else {
              clearPledgeForm(document.getElementById('bikes-form').elements, 'Bike');
              if ($('#creditCard').is(':checked')){
                $("#stripeToken").remove();
              }
              showLoginError('Thank You', 'Thank You for signing up for the bike event. \n' +
                                           'A confirmation email has been sent to you. \n' +
                                           'Please email questions to: info@Bike4Beds.org \n' +
                                           'or call Matt at (610) 791-1067.');
              return true;
            }
          }
          validateForm();
      },
      dataType: 'json'
    });
  };

  //Button Click for Bikes Form
  $('#btn-login-bikes').click(function(e){
    e.preventDefault();
    console.log('click occured');
    console.log($('#amount').val());
    var loginErrors = $('.modal-alert');
    loginErrors.modal({ show : false, keyboard : true, backdrop : true });
    showLoginError = function(t, m)
    {
      $('.modal-alert .modal-header h3').text(t);
      $('.modal-alert .modal-body p').text(m);
      loginErrors.modal('show');
    }

    // var env = $('#env').val();
    // console.log( 'buttonclick bikes env: ' + env );
    // var publicStripeApiKey = setStripe(env);

    var err = '';
    errMsg = validate_form_required_bikes(err);
    //console.log('error msg: ' + errMsg.length);

    if (errMsg.length == 0){   //Make sure there are not any missing required fields
      //Amount Field -- Replace the $
      $('#amount').val($('#amount').val().replace(/.*\$/, ''));
      //Remove any decimal places
      $('#amount').val(parseFloat($('#amount').val()).toFixed(0));
      //Payment Type
      if ($('#creditCard').is(':checked')){
        $('#paymentType').val('creditCard');
        console.log('PaymentType: ' + $('#paymentType').val());
      } else {
        $('#paymentType').val('Check');
        console.log('PaymentType: ' + $('#paymentType').val());
      }

      if ($("#stripeToken").length){  //Already have a token, error return from server
        errMsg = postBikes(err);
      } else {
        if($('#creditCard').is(':checked')){
          console.log('customejs - sendEmail');
          //sendEmail(err)
          errMsg = stripeResponseHandlerBikes(sendEmail(err));  // paying by credit card
        } else {
          errMsg = postBikes(err);  // paying by check
        }
      }
    } else {
      showLoginError('Whoops!', errMsg);
    }
  });

 //--------] Volunteer [-----------


  //postVolunteer Function
  function postVolunteer(){
    console.log('postVolunteer');
    $.ajax({
      type: "POST",
      url: '/volunteer',
      data: $('#volunteer-form').serialize(),
      success: function(data){

         console.log('ajax post returned success');
         var loginErrors = $('.modal-alert');
         loginErrors.modal({ show : false, keyboard : true, backdrop : true });
         showLoginError = function(t, m)
          {
            $('.modal-alert .modal-header h3').text(t);
            $('.modal-alert .modal-body p').text(m);
            loginErrors.modal('show');
          }
         var validateForm = function validateForm()
          {
            if (data.dataSave == 'err' ){
              console.log('showloginerrors');
              var message = '';
              console.log(data);
              //Data Validation Errors
              if ($(data.error.errors).length) {
                $.each(data.error.errors, function(i,e){
                  message += e.message + '\n ';
                });
              }
              showLoginError('Whoops!', message);
              return false;
            } else {
              document.getElementById('volunteer-form').reset();
              clearPledgeForm(document.getElementById('volunteer-form').elements, 'Volunteer');

              showLoginError('Thank You', 'Thank You for signing up to volunteer for the bike event. \n' +
                                           'A confirmation email has been sent to you. \n' +
                                           'Please email questions to: info@Bike4Beds.org \n' +
                                           'or call Matt at (610) 791-1067.');
              return true;
            }
          }
          validateForm();
      },
      dataType: 'json'
    });
  };

  //Button Click for Volunteer Form
  $('#btn-login-volunteer').click(function(e){
    e.preventDefault();
    console.log('click occured');
    var loginErrors = $('.modal-alert');
    loginErrors.modal({ show : false, keyboard : true, backdrop : true });
    showLoginError = function(t, m)
    {
      $('.modal-alert .modal-header h3').text(t);
      $('.modal-alert .modal-body p').text(m);
      loginErrors.modal('show');
    }

    var err = '';
    errMsg = validate_form_required_volunteer(err);
    console.log('error msg: ' + errMsg.length);

    if (errMsg.length == 0){
      errMsg = postVolunteer(err);
    } else {
      showLoginError('Whoops!', errMsg);
    }
  });

  //Strip caller pop window
  function stripeResponseHandler(){
      var token = function(res){
        //console.log('Got token ID:', res.id);
        var form = $('#pledge-form');
        $('<input>').attr({
          type: 'hidden',
          //id: 'stripeToken',
          name: 'stripeToken',
          value: res.id,
        }).appendTo('form');
          postPledge();
      };

      StripeCheckout.open({
        key:         publicStripeApiKey,
        address:     false,
        amount:      $('#amount').val() * 100,
        currency:    'usd',
        name:        'BikeforBeds@gmail.com',
        description: 'Pledge',
        panelLabel:  'Checkout',
        token:       token
      });  //, stripeResponseHandler);

      return false;
     };


  //Strip caller pop window
  function stripeResponseHandlerBikes(){
      var token = function(res){
        //console.log('Got token ID:', res.id);
        var form = $('#bikes-form');
        $('<input>').attr({
          type: 'hidden',
          id: 'stripeToken',
          name: 'stripeToken',
          value: res.id,
        }).appendTo('form');
          postBikes();
      };

      StripeCheckout.open({
        key:         publicStripeApiKey,
        address:     false,
        amount:      $('#amount').val() * 100,
        name:        'BikeforBeds@gmail.com',
        description: 'Bike Event',
        panelLabel:  'Checkout',
        token:       token
      });  //, stripeResponseHandlerBikes);

      return false;
     };


  //Validates the local form prior to sending to the server
  function validate_form_required_pledge(errMsg) {
      $('#pledge-form .required:text').each(function(){
         console.log('Text: ' + $(this).attr('alt'));
         var $spanVal = $(this).next();
         if ($(this).val()!="") {
            $(this).css('border-color', 'grey');
         }else {
            $(this).css('border-color','red');
            errMsg += "\n" + $(this).attr('alt') + " is a mandatory field.";
         }
      });
      $('#pledge-form .required:checkbox').each(function(){
         console.log('check box: ' + $(this).attr('alt'));
         if ($(this).attr('checked')) {
            $(this).css('outline', 'none');
         } else {
            $(this).css('outline', '1px solid  red');
            errMsg += "\n" + $(this).attr('alt') + " is a mandatory field.";
         };
      });

         console.log('State: ' + $("#stateDw option:selected").text());

      if (!($("#stateDw option:selected").text() == 'Select a state' || $("#stateDw option:selected").text() == '')){
        $('#stateDw').css('outline', 'grey');
      } else {
        $('#stateDw').css('outline', '1px solid  red');
        errMsg += "\n" + $('#stateDw').attr('alt') + " is a mandatory field.";
      };

      return errMsg;
  }

  //Validates the local form prior to sending to the server
  function validate_form_required_bikes(errMsg) {
      $('#bikes-form .required:text').each(function(){
         var $spanVal = $(this).next();
         if ($(this).val()!="") {
            $(this).css('border-color', 'grey');
         }else {
            $(this).css('border-color','red');
            errMsg += "\n" + $(this).attr('alt') + " is a mandatory field.";
         }
      });
      $('#bikes-form .required:checkbox').each(function(){
        console.log($(this));
         if ($(this).prop('checked')) {
            $(this).css('outline', 'none');
         } else {
            $(this).css('outline', '1px solid  red');
            errMsg += "\n" + $(this).attr('alt') + " is a mandatory field.";
         };
      });

      if (!($("#stateDw option:selected").text() == 'Select a state' || $("#stateDw option:selected").text() == '')){
        $('#stateDw').css('outline', 'grey');
      } else {
        $('#stateDw').css('outline', '1px solid  red');
        errMsg += "\n" + $('#stateDw').attr('alt') + " is a mandatory field.";
      };

      if (!($("#eventsDw option:selected").text() == 'Select an event' || $("#eventsDw option:selected").text() == '')){
        $('#eventsDw').css('outline', 'grey');
      } else {
        $('#eventsDw').css('outline', '1px solid  red');
        errMsg += "\n" + $('#eventsDw').attr('alt') + " is a mandatory field.";
      };

      if (!($("#shirtDw option:selected").text() == 'None' || $("#shirtDw option:selected").text() == '')){
        $('#shirtDw').css('outline', 'grey');
      } else {
        $('#shirtDw').css('outline', '1px solid  red');
        errMsg += "\n" + $('#shirtDw').attr('alt') + " is a mandatory field.";
      };

      if (!($("#bikeRouteDw option:selected").text() == 'None' || $("#bikeRouteDw option:selected").text() == '')){
        $('#bikeRouteDw').css('outline', 'grey');
      } else {
        $('#bikeRouteDw').css('outline', '1px solid  red');
        errMsg += "\n" + $('#bikeRouteDw').attr('alt') + " is a mandatory field.";
      };

      if (!($("#transportationDw option:selected").text() == 'Select Transportation Back to Woodstown' || $("#transportationDw option:selected").text() == '')){
        $('#transportationDw').css('outline', 'grey');
      } else {
        $('#transportationDw').css('outline', '1px solid  red');
        errMsg += "\n" + $('#transportationDw').attr('alt') + " is a mandatory field.";
      };

      return errMsg;
  }

  //Validates the local form prior to sending to the server
  function validate_form_required_volunteer(errMsg) {
      $('#volunteer-form .required:text').each(function(){
         console.log('Text: ' + $(this).attr('alt'));
         var $spanVal = $(this).next();
         if ($(this).val()!="") {
            $(this).css('border-color', 'grey');
         }else {
            $(this).css('border-color','red');
            errMsg += "\n" + $(this).attr('alt') + " is a mandatory field.";
         }
      });

      if (!($("#stateDw option:selected").text() == 'Select a state' || $("#stateDw option:selected").text() == '')){
        $('#stateDw').css('outline', 'grey');
      } else {
        $('#stateDw').css('outline', '1px solid  red');
        errMsg += "\n" + $('#stateDw').attr('alt') + " is a mandatory field.";
      };

      if (!($("#eventsDw option:selected").text() == 'Select an event' || $("#eventsDw option:selected").text() == '')){
        $('#eventsDw').css('outline', 'grey');
      } else {
        $('#eventsDw').css('outline', '1px solid  red');
        errMsg += "\n" + $('#eventsDw').attr('alt') + " is a mandatory field.";
      };

      if (!($("#shirtDw option:selected").text() == 'None' || $("#shirtDw option:selected").text() == '')){
        $('#shirtDw').css('outline', 'grey');
      } else {
        $('#shirtDw').css('outline', '1px solid  red');
        errMsg += "\n" + $('#shirtDw').attr('alt') + " is a mandatory field.";
      };

      return errMsg;
  }

  //errMsg += "\nUserName is a mandatory field.";

  $('#creditCard').click(function(e){
   $('#stripe-form').show();
   //document.getElementById('stripe-form').style.display='block'
   console.log('credit card clicked');
  });

  $('#check').click(function(e){
   $('#stripe-form').hide();
   //document.getElementById('stripe-form').style.display='none'
   console.log('credit card clicked');
  });

  var form = $( '#pledge-form');
  function parse(document){
    $(document).find("combo").each(function(){
       var optionLabel = $(this).find('text').text();
       var optionValue = $(this).find('value').text();
       $('#stateDw').append(
       '<option value="'+ optionValue + '">' + optionLabel + '</option>'
       );
    });
    //$("#stateDw option[value=" + _state + "]").attr("selected", "selected");
  };
  if ($("#stateDw").length){
    console.log('state ajax called');
    var form = $( '#pledge-form');
    $.ajax({
     url:'/modules/state-list.xml',
     data: form.serialize(),
     dataType:'xml',
     success:parse,
     error:function(){alert('file state-list load error');}
    });
  } else {
    console.log('state ajax not called');
  }

  function parseShirt(document){
    $(document).find("combo").each(function(){
       var optionLabel = $(this).find('text').text();
       var optionValue = $(this).find('value').text();
       $('#shirtDw').append(
       '<option value="'+ optionValue + '">' + optionLabel + '</option>'
       );
    });
    $("#shirtDw option[value='!{shirt}']").attr("selected", "selected");
  };
  if ($("#shirtDw").length){
    console.log('shirt ajax called');
    $.ajax({
     url:'/modules/shirt-list.xml',
     dataType:'xml',
     success:parseShirt,
     error:function(){alert('file shirt-list load error');}
    });
  } else {
    console.log('shirt ajax not called');
  }

  function parseBikeRoute(document){
    $(document).find("combo").each(function(){
       var optionLabel = $(this).find('text').text();
       var optionValue = $(this).find('value').text();
       $('#bikeRouteDw').append(
       '<option value="'+ optionValue + '">' + optionLabel + '</option>'
       );
    });
    $("#bikeRouteDw option[value='!{bikeRoute}']").attr("selected", "selected");
  };
  if ($("#bikeRouteDw").length){
    console.log('bikeRoute ajax called');
    $.ajax({
     url:'/modules/bikeRoute-list.xml',
     dataType:'xml',
     success:parseBikeRoute,
     error:function(){alert('file bikeRoute-list load error');}
    });
  } else {
    console.log('bikeRoute ajax not called');
  }

  function parseTransportation(document){
    $(document).find("combo").each(function(){
       var optionLabel = $(this).find('text').text();
       var optionValue = $(this).find('value').text();
       $('#transportationDw').append(
       '<option value="'+ optionValue + '">' + optionLabel + '</option>'
       );
    });
    $("#transportationDw option[value='!{transportation}']").attr("selected", "selected");
  };
  if ($("#transportationDw").length){
    console.log('transportation ajax called');
    $.ajax({
     url:'/modules/transportation-list.xml',
     dataType:'xml',
     success:parseTransportation,
     error:function(){alert('file transportation-list load error');}
    });
  } else {
    console.log('transportation ajax not called');
  }

  function parseSponsorship(document){
    $(document).find("combo").each(function(){
       var optionLabel = $(this).find('text').text();
       var optionValue = $(this).find('value').text();
       $('#sponsorshipDw').append(
       '<option value="'+ optionValue + '">' + optionLabel + '</option>'
       );
    });
    $("#sponsorshipDw option[value='!{sponsorship}']").attr("selected", "selected");
  };
  if ($("#sponsorshipDw").length){
    console.log('sponsorship ajax called');
    $.ajax({
     url:'/modules/sponsorship-list.xml',
     dataType:'xml',
     success:parseSponsorship,
     error:function(){alert('file sponsorship-list load error');}
    });
  } else {
    console.log('sponsorship ajax not called');
  }

  function parseEvents(document){
    $(document).find("combo").each(function(){
       var optionLabel = $(this).find('text').text();
       var optionValue = $(this).find('value').text();
       $('#eventsDw').append(
       '<option value="'+ optionValue + '">' + optionLabel + '</option>'
       );
    });
    $("#eventsDw option[value='!{eventsList}']").attr("selected", "selected");
  };

  $("#eventsDw").change(function(){
    console.log('click event eventsDw ajax called');
    var bikeEvent = $('#eventsDw').attr("selected", "selected");
    //console.log(bikerEvent.val());
    $.ajax({
      url: '/bikerList/' + bikeEvent.val(),
      dataType: 'json',
      success: function(biker){
         $('#bikersDw').empty();
         console.log('/bikerList/' + bikeEvent.val());

         var optionValue1 = $(this).find('firstName').text();
         var optionValue2 = $(this).find('lastName').text();
         $.each(biker, function(index, value){
          $('#bikersDw').append( '<option value="'+  value.firstName + ' ' + value.lastName + '">' + value.firstName + ' ' + value.lastName + '</option>' );
       });
      }
    })
  });

function clearPledgeForm(frm_elements, form){
  console.log('FormElements: ' + frm_elements);
  for (i = 0; i < frm_elements.length; i++)
  {
      // if (!((frm_elements[i].name == 'amount' || frm_elements[i].name == 'amountEnt')
      //            && form == 'Bike')){  //Keep the amount field set to 30.00
      if (frm_elements[i].name == 'amountEnt' && form == 'Bike'){
        frm_elements[i].value = 60;

      }else if (frm_elements[i].name == 'amount' && form == 'Bike'){
        frm_elements[i].value = 60;

      } else if (frm_elements[i].name == 'coupon' && form == 'Bike'){
        frm_elements[i].value = 0;

      } else if (frm_elements[i].name == 'couponCode' && form == 'Bike'){
        frm_elements[i].value = 'april15';

      } else {

        field_type = frm_elements[i].type.toLowerCase();
        switch (field_type){
          case "text":
          case "password":
          case "textarea":
          case "hidden":
              frm_elements[i].value = "";
              break;
          //case "radio":
          case "checkbox":
              if (frm_elements[i].checked)
              {
                  frm_elements[i].checked = false;
              }
              break;
          case "select-one":
          case "select-multi":
              frm_elements[i].selectedIndex = -1;
              break;
          default:
              break;
        }
      }
    }
  }

  if ($("#eventsDw").length){
    console.log('events ajax called');
    $.ajax({
     url:'/modules/event-list.xml',
     dataType:'xml',
     success:parseEvents,
     error:function(){alert('file event-list load error');}
    });
  } else {
    console.log('events ajax not called');
  }

});
