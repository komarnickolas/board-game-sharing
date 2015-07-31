$(document).ready(function(){
  $('#Loginbtn').hide();
  $('#stopEditing').hide();
  for(var x = 0;x<userArray.length; x++){
    if(userArray[x].username === loggedInUser){
      for(var y = 0; y<userArray[x].games.length; y++){
        $('#tablebody').append('<tr id="newrow'+y+'"></tr>');
        $('#newrow'+y).append('<td id="title'+y+'">'+userArray[x].games[y].gameName+'</td>');
        $('#newrow'+y).append('<td id="nop'+y+'">'+userArray[x].games[y].numberOfPlayers+'</td>');
        $('#newrow'+y).append('<td id="status'+y+'">'+userArray[x].games[y].gameStatus+'</td>');
        $('#newrow'+y).append('<td id="condition'+y+'">'+userArray[x].games[y].gameCondition+'</td>');
        // $('#newrow'+y).append('<button id="'+y+'"> <image src="css/resources/minus.png"></image></button>');
      }
      if(userArray[x].pingged[0] === true){
        $('#ping').append('<l>'+userArray[x].pingged[1]+'</l>');
      }
    }
  }
  // $('button').click(function(){
  //   if($(this).attr('id') != $('#submitGamebtn').attr('id')){
  //     var btnpressed = $(this).attr('id');
  //     console.log(btnpressed);
  //     for(var x = 0;x<userArray.length; x++){
  //       if(userArray[x].username === loggedInUser){
  //         for(var y = 0; y<userArray[x].games.length; y++){
  //           if(userArray[x].games[y].gameName = $('#title'+y).text()){
  //             userArray[x].games.splice(y,y);
  //           }
  //         }
  //       }
  //     }
  //     $(this).parent().remove();
  //     saveUsers();
  //   }
  // });
  var number = 0;
  $('#submitGamebtn').click(function(e){
    e.preventDefault();
    console.log('adding game');
    var newGameTitle = $('#gamesTitle').val();
    var newMinGameNumberOfPlayers = $('#minDrop').val();
    var newMaxGameNumberOfPlayers = $('#maxDrop').val();
    var newGameStatus = $('#statusDrop').val();
    var newGameCondition = $('#conditionDrop').val();
    console.log(newGameTitle, newMinGameNumberOfPlayers +"-"+ newMaxGameNumberOfPlayers, newGameStatus, newGameCondition);
    var userProfileToEdit = undefined;
    for(var x = 0; x<userArray.length;x++){
      if(userArray[x].username != loggedInUser){
        number++;
      }
    }
    console.log(number);
    userArray[number].games.push(new game(newGameTitle, newGameStatus, newGameCondition, newMinGameNumberOfPlayers+"-"+newMaxGameNumberOfPlayers, number));
    console.log(userArray[number]);
    $('#tablebody').append(render(newGameTitle, newGameStatus, newGameCondition, newMinGameNumberOfPlayers +"-"+ newMaxGameNumberOfPlayers, number));
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
