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
  interval: 4000 // in milliseconds  
}) 

$('#mycarouselBikes').carousel({  
  interval: 4000 // in milliseconds  
}) 


var _state;
$(document).ready(function(){
    // var publicStripeApiKey = '...';
    var publicStripeApiKeyTesting = 'pk_test_iJZ2F2cUTwotuyV2OH6VHThg';

    Stripe.setPublishableKey(publicStripeApiKeyTesting);

  $('#btn-login').click(function(e){
    e.preventDefault();
    console.log('click occured');

    $.ajax({
      type: "POST",
      url: '/pledge',
      data: $('#pledge-form').serialize(),
      success: function(data){
         console.log('ajax post returned success');
         clearPledgeForm(document.getElementById('pledge-form').elements);
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
              $.each(data.error.errors, function(i,e){
                message = message + '\n ' + e.message;
              });
              showLoginError('Whoops!', message); 
              return false;
            } else {
              return true;
            }
          }
          validateForm();
      },
      dataType: 'json' 
    });
                
    // });
  });

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
              $.each(data.error.errors, function(i,e){
                message += e.message + '\n ';
              });
              showLoginError('Whoops!', message); 
              return false;
            } else {
              clearPledgeForm(document.getElementById('bikes-form').elements);
              $("#stripeToken").remove();
              return true;
            }
          }
          validateForm();
      },
      dataType: 'json' 
    });
                
    // });
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

    var err = '';
    errMsg = validate_form_required(err);
    console.log('error msg: ' + errMsg.length);

    if (errMsg.length == 0){   //Make sure there are not any missing required fields
      //Amount Field -- Replace the $
      $('#amount').val($('#amount').val().replace(/.*\$/, ''));
      //Remove any decimal places
      $('#amount').val(parseFloat($('#amount').val()).toFixed(0));

      if ($("#stripeToken").length){  //Already have a token, error return from server 
        postBikes();  
      } else {
        if($('#creditCard').is(':checked')){
          stripeResponseHandler();  // paying by credit card
        } else { 
          postBikes();  // paying by check
        }
      }
    } else {
      showLoginError('Whoops!', errMsg); 
    }
  });


  //Strip caller pop window
  function stripeResponseHandler (){
      var token = function(res){
        console.log('Got token ID:', res.id);

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
        key:         publicStripeApiKeyTesting,
        address:     false,
        amount:      $('#amount').val() * 100,
        name:        'BikeforBeds@gmail.com',
        description: 'Bike Event',
        panelLabel:  'Checkout',
        token:       token
      }, stripeResponseHandler);

      return false;
     };

  //Validates the local form prior to sending to the server
  function validate_form_required(errMsg) {
      $('#bikes-form .required:text').each(function(){
         console.log('Text: ' + $(this).attr('name'));
         var $spanVal = $(this).next(); 
         if ($(this).val()!="") { 
            $(this).css('border-color', 'grey'); 
         }else {           
            $(this).css('border-color','red');
            errMsg += "\n" + $(this).attr('name') + " is a mandatory field.";
         }
      });
      $('#bikes-form .required:checkbox').each(function(){
         console.log('check box: ' + $(this).attr('name'));
         if ($(this).attr('checked')) { 
            $(this).css('outline', 'none'); 
         } else {      
            $(this).css('outline', '1px solid  red'); 
            errMsg += "\n" + $(this).attr('name') + " is a mandatory field.";
         };
      });
      
      if ($("#stateDw option:selected").text() != 'Select a state'){
        $('#stateDw').css('outline', 'grey'); 
      } else {      
        $('#stateDw').css('outline', '1px solid  red');
        errMsg += "\n" + $('#stateDw').attr('name') + " is a mandatory field.";
      };

      if ($("#eventsDw option:selected").text() != 'Select an event'){
        $('#eventsDw').css('outline', 'grey'); 
      } else {      
        $('#eventsDw').css('outline', '1px solid  red');
        errMsg += "\n" + $('#eventsDw').attr('name') + " is a mandatory field.";
      };

      if ($("#shirtDw option:selected").text() != 'None'){
        $('#shirtDw').css('outline', 'grey'); 
      } else {      
        $('#shirtDw').css('outline', '1px solid  red');
        errMsg += "\n" + $('#shirtDw').attr('name') + " is a mandatory field.";
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

function clearPledgeForm(frm_elements){
  console.log('FormElements: ' + frm_elements);
  for (i = 0; i < frm_elements.length; i++)
  {
      if (frm_elements[i].name != 'amount'){  //Keep the amount field set to 30.00
        field_type = frm_elements[i].type.toLowerCase();
        switch (field_type)
        {
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
};

  if ($("#eventsDw").length){
    console.log('events ajax called');   
    $.ajax({ 
     url:'/modules/event-list.xml',
     dataType:'xml',
     success:parseEvents,
     error:function(){alert('file event-list load error');}
    });
  } else {
    console.log('state ajax not called');
  }
});
