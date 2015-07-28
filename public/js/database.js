$(document).ready(function(){
  $.ajax({
    url: db + apiKey,
    type:'GET',
    success: console.log("Connected to database")
  });
  $('#Username').hide();
  $('#Logoutbtn').hide();
  var db = 'https://api.mongolab.com/api/1/databases/users';
  var collection = "/collections/usernames/55b6862ae4b077bc38f60527";
  var apiKey = '?apiKey=CmxO8Pu1HeEpa6MSJyWa3ceKlKExom1_';
  var userArray = [];
  var userToAdd = undefined;
  var userLoggedIn = false;
  var retrievedIsUserLoggedIn = localStorage.getItem('IsUserLoggedIn');
  if(retrievedIsUserLoggedIn != null){
    userLoggedIn = true;
    $('#Loginbtn').hide();
  }
  var currentUser = undefined;
  if(userLoggedIn === true){
    var retrievedCurrentUser = localStorage.getItem('CurrentUser');
    if(retrievedCurrentUser != null){
      currentUser = retrievedCurrentUser;
      console.log(currentUser);
      loginUser();
    }
  }
  else{
    logoutUser();
  }
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
  var user = function(u,p){
    this.username = u;
    this.password = p;
    this.games = [];
  }
  var game = function(n,s,c,p){
    this.gameName = n;
    this.gameStatus = s;
    this.gameCondition = c;
    this.numberOfPlayers = p;
  }

  var userNumber = -1;

  $('#login-button').click(function(){
    event.preventDefault();
    $('form').fadeOut(500);
    $('.wrapper').addClass('form-success');
    var doesUserExist = false;
    console.log(userArray.length);
    console.log($('#username').val());
    userNumber = -1;
    for(var x = 0; x<userArray.length;x++){
      userNumber++;
      var boxValue = $('#username').val();
      var selectedUser = ""+userArray[x].username;
      if(selectedUser.toLowerCase() === boxValue.toLowerCase()){
        console.log("user already exists");
        doesUserExist = true;
      }
    }
    if(doesUserExist === false){
      saveUser();
    }
    else{
      console.log(userNumber);
      currentUser = $('#username').val();
      loginUser();
      window.location.href = "#close";
    }
  });
  $('#Logoutbtn').click(function(){
    console.log("clicked");
    logoutUser();
  });
  function saveUser(){
    userToAdd = new user($('#username').val(),$('#password').val());
    userToAdd.games.push(new game("Example Game","Available","Good"));
    userArray.push(userToAdd);
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
  function loginUser(){
    $('#Username').show();
    $('#Loginbtn').hide();
    $('#Logoutbtn').show();
    $('#UsernameLink').html(currentUser);
    userLoggedIn = 'true';
    localStorage.setItem('CurrentUser',currentUser);
    localStorage.setItem('IsUserLoggedIn',userLoggedIn);
    console.log(localStorage.getItem('CurrentUser'));
  }
  function logoutUser(){
    $('#Username').hide();
    $('#Logoutbtn').hide();
    $('#Loginbtn').show();
    $('#UsernameLink').html();
    userLoggedIn = null;
    localStorage.removeItem('CurrentUser');
    localStorage.removeItem('IsUserLoggedIn');
  }
});
