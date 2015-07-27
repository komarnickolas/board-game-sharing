$(document).ready(function(){
  $('Username').hide();
  $('#Loginbtn').click(function(){
    console.log('clicked');
    window.location.href = "#openModal";
  });
  var db = 'https://api.mongolab.com/api/1/databases/users';
  var collection = "";
  var apiKey = '?apiKey=CmxO8Pu1HeEpa6MSJyWa3ceKlKExom1_';
  var user = function(u,p){
    this.username = u;
    this.password = p;
  };
  $.ajax({
    url: db + apiKey,
    type:'GET',
    success: console.log("Connected to: "+db)
  });
  $('#submit').click(function(){
    var newUser = new user($('#username').val(),$('#password').val());
    var data = JSON.stringify({username: {newUser}});
    console.log(newUser);
    console.log(data);
    console.log(db+"/collections/usernames"+apiKey);
    $.ajax({
      url:db+"/collections/usernames"+apiKey,
      method: 'POST',
      data: data,
      contentType: 'application/json',
      success: console.log('success')
    });
  });
});
