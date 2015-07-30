$(document).ready(function(){
  $('#Loginbtn').hide();
  $('#stopEditing').hide();
  for(var x = 0;x<userArray.length; x++){
    if(userArray[x].username === loggedInUser){
      for(var y = 0; y<userArray[x].games.length; y++){
        $('#tablebody').append('<tr id="newrow'+y+'"></tr>');
        $('#newrow'+y).append('<td>'+userArray[x].games[y].gameName+'</td>');
        $('#newrow'+y).append('<td>'+userArray[x].games[y].numberOfPlayers+'</td>');
        $('#newrow'+y).append('<td>'+userArray[x].games[y].gameStatus+'</td>');
        $('#newrow'+y).append('<td>'+userArray[x].games[y].gameCondition+'</td>');
      }
    }
  }
  $('#editGamebtn').click(function(e){
    e.preventDefault();
    console.log('clicked');

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
  var number = -1;
  $('#submitGamebtn').click(function(e){
    e.preventDefault();
    console.log('adding game');
    var newGameTitle = $('#gamesTitle').val();
    var newGameNumberOfPlayers = $('#gamesNumberOfPlayers').val();
    var newGameStatus = $('#statusDrop').val();
    var newGameCondition = $('#conditionDrop').val();
    console.log(newGameTitle, newGameNumberOfPlayers, newGameStatus, newGameCondition);
    var userProfileToEdit = undefined;
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
    $('#tablebody').append(render(newGameTitle, newGameStatus, newGameCondition, newGameNumberOfPlayers));
    saveUsers();
    $('#gamesTitle').val("");
    $('#gamesNumberOfPlayers').val("");
    $('#gamesStatus').val("");
    $('#gamesCondition').val("");
  });
  function render(t,s,c,n){
    return "<tr id='"+number+"'><td>"+t+"</td><td>"+n+"</td><td>"+s+"</td><td>"+c+"</td></tr>";
  }
});
