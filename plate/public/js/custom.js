$(document).ready(function(){
  console.log('overwriting carousel');
  $('#mycarousel').carousel({interval: 4000});
  $('ul.nav > li').click(function (e) {
    e.preventDefault();
    $('ul.nav > li').removeClass('active');
    $(this).addClass('active');                
  });     
});