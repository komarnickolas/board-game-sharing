$(document).ready(function(){
  $('#Loginbtn').hide();
  $('#stopEditing').hide();
  for(var x = 0;x<userArray.length; x++){
    if(userArray[x].username === loggedInUser){
      for(var y = 0; y<userArray[x].games.length; y++){
        $('<tr id="newrow'+y+'"></tr>').insertBefore('#addagame');
        $('#newrow'+y).append('<td>'+userArray[x].games[y].gameName+'</td>');
        $('#newrow'+y).append('<td>'+userArray[x].games[y].numberOfPlayers+'</td>');
        $('#newrow'+y).append('<td>'+userArray[x].games[y].gameStatus+'</td>');
        $('#newrow'+y).append('<td>'+userArray[x].games[y].gameCondition+'</td>');
      }
    }
  }
  $('#editGamebtn').click(function(e){
    e.preventDefault();
    $('#table').attr('contenteditable', '');
    $('#stopEditing').show();
  });
  $('#stopEditing').click(function(e){
    e.preventDefault();
    for(var x = 0; x<userArray.length; x++){
      if(userArray[x].username === loggedInUser){
        for(var y = 0; y<userArray[x].games.length; y++){
          if(userArray[x].games[y].gameName === "" || userArray[x].games[y].gameName === "undefined"){
            console.log("blank found");
            userArray[x].games.splice(y,y);
          }
          else{
            console.log("blank not found");
          }
        }
      }
    }
    $('#stopEditing').hide();
    saveUsers();
  });
  $('#submitGamebtn').click(function(e){
    e.preventDefault();
    console.log('adding game');
    var newGameTitle = $('#gamesTitle').val();
    var newGameNumberOfPlayers = $('#gamesNumberOfPlayers').val();
    var newGameStatus = $('#statusDrop').val();
    var newGameCondition = $('#conditionDrop').val();
    console.log(newGameTitle, newGameNumberOfPlayers, newGameStatus, newGameCondition);
    var userProfileToEdit = undefined;
    var number = -1;
    for(var x = 0; x<userArray.length;x++){
      var boxValue = $('#UsernameLink').text();
      var selectedUser = ""+userArray[x].username;
      if(selectedUser.toLowerCase() === boxValue.toLowerCase()){
        number++;
      }
    }
    console.log(number);
    userArray[number].games.push(new game(newGameTitle, newGameStatus, newGameCondition, newGameNumberOfPlayers));
    console.log(userArray[number]);
    $(render(newGameTitle, newGameStatus, newGameCondition, newGameNumberOfPlayers)).insertBefore("#addagame");
    window.saveUsers();
    $('#gamesTitle').val("");
    $('#gamesNumberOfPlayers').val("");
    $('#gamesStatus').val("");
    $('#gamesCondition').val("");
  });
  function render(t,s,c,n){
    return "<tr><td>"+t+"</td><td>"+n+"</td><td>"+s+"</td><td>"+c+"</td></tr>";
  }
});
