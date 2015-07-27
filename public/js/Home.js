$(document).ready(function(){
  $('Username').hide();
  $('#Loginbtn').click(function(){
    console.log('clicked');
    window.location.href = "#openModal";
  });
  $('#submitbtn').click(function(){
    var searchQuery = $('#inputbox').val();
    console.log(searchQuery);
  });
});
