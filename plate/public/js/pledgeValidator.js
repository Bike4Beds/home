$(document).ready(function(){

  function firstNameValidators(){

  // bind a simple alert window to this controller to display any errors //

    loginErrors = $('.modal-alert');
    loginErrors.modal({ show : false, keyboard : true, backdrop : true });


   showLoginError = function(t, m)
    {
      $('.modal-alert .modal-header h3').text(t);
      $('.modal-alert .modal-body p').text(m);
      loginErrors.modal('show');
    }

  }

  function validateForm()
  {
    if ($('#firstName-tf').val() == ''){
      showLoginError('Whoops!', 'Please enter a valid username');
      return false;
    } else{
      return true;
    }
  }

});