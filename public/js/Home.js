$(document).ready(function(){
  $('#Loginbtn').click(function(){
    console.log('clicked');
    window.location.href = "#openModal";
  });
  localStorage.setItem('SearchQuery',"");
  $('#submitbtn').click(function(){
    var searchQuery = $('#inputbox').val();
    console.log(searchQuery);
    localStorage.setItem('SearchQuery',searchQuery);
  });
});
