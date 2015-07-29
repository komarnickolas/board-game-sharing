$(document).ready(function(){
  console.log($('#UsernameLink').text());
  $('#Loginbtn').hide();
  $('#addGame').hide();
  $('#addGameBtn').click(function(){
    $(this).fadeOut(1000);
    $('#addGame').fadeIn(2000);
  });
  $('#submitGamebtn').click(function(e){
    e.preventDefault();
    console.log('adding game');
    var newGameTitle = $('#gamesTitle').val();
    var newGameNumberOfPlayers = $('#gamesNumberOfPlayers').val();
    var newGameStatus = $('#gamesStatus').val();
    var newGameCondition = $('#gamesCondition').val();
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
