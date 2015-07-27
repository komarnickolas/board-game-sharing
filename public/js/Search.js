$(document).ready(function(){
  $('Username').hide();
  $('#Loginbtn').click(function(){
    console.log('clicked');
    window.location.href = "#openModal";
  });
  var retrievedSearchQuery = localStorage.getItem('SearchQuery');
  if(retrievedSearchQuery != null){
    console.log(retrievedSearchQuery);
  }
});
