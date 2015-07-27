$(document).ready(function(){
  var db = 'https://api.mongolab.com/api/1/databases/users';
  var collection = "/collections/usernames/55b6862ae4b077bc38f60527";
  var apiKey = '?apiKey=CmxO8Pu1HeEpa6MSJyWa3ceKlKExom1_';
  var userArray = [];
  var getExistingUsers = $.ajax({
      url:db + collection + apiKey,
      type: "GET",
      async: false,
      contentType: "application/json",
      dataType: 'json',
      success: function(data)
        {
          console.log("Success");
        }
  });
  console.log(getExistingUsers.responseText);
  var usersToLoad = JSON.parse(getExistingUsers.responseText);
  console.log(usersToLoad.username);
  userArray = usersToLoad.username.userArray;
  console.log(userArray);
  var user = function(u,p,g){
    this.username = u;
    this.password = p;
    this.games = [] || g;
  };
  $.ajax({
    url: db + apiKey,
    type:'GET',
    success: console.log("Connected to: "+db)
  });
  $('#submit').click(function(){
    var doesUserExist = false;
    for(var x = 0; x<userArray.length;x++){
      if(userArray[x].username === $('#username').val()){
        console.log("user already exists");
        doesUserExist = true;
      }
    }
    if(doesUserExist === false){
      saveUser();
    }
  });
  function saveUser(){
    userArray.push(new user($('#username').val(),$('#password').val()));
    var data = JSON.stringify({username: {userArray}});
    console.log(data);
    console.log(db+"/collections/usernames"+apiKey);
    $.ajax({
      url:db+"/collections/usernames"+apiKey,
      method: 'PUT',
      data: data,
      contentType: 'application/json',
      success: console.log('success')
    });
  }
});
