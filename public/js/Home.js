$(document).ready(function(){
  $('Username').hide();
  $('#Loginbtn').click(function(){
    console.log('clicked');
    window.location.href = "#openModal";
  });
  var db = 'https://api.mongolab.com/api/1/databases/users'
  var collection = "";
  var apiKey = '?apiKey=CmxO8Pu1HeEpa6MSJyWa3ceKlKExom1_'
  $.ajax({
    url: db + apiKey,
    type:'GET',
    success: console.log("Connected to: "+db)
  });
});
