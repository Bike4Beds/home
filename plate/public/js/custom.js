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

$(document).ready(function(){
  function parse(document){
	  $(document).find("combo").each(function(){
	     var optionLabel = $(this).find('text').text();
	     var optionValue = $(this).find('value').text();
	     $('#stateDw').append(
	    '<option value="'+ optionValue + '">' + optionLabel + '</option>'
	     );
	  });
  };
  $.ajax({
   url:'/modules/state-list.xml',
   dataType:'xml',
   success:parse,
   error:function(){alert('file state-list load error');}
  });
});

