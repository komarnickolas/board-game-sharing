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
// $('#editGamebtn').click(function(e){
//   e.preventDefault();
//   console.log('clicked');
//   $('td').each(function(){
//     if($(this).attr('class') === 'title'){
//       var value = $(this).text();
//       $(this).replaceWith('<td><input placeholder="'+value+'"></input></td>');
//     }
//     else if($(this).attr('class') === 'nop'){
//       var value = $(this).text();
//       $(this).replaceWith("<td><select id='minDrop'><option value='1'>Minimun 1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option><option value='8'>8+</option></select><select id='maxDrop'><option value='1'>Maximum 1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option><option value='8'>8+</option></select></td>");
//     }
//     else if($(this).attr('class') === 'status'){
//       var value = $(this).text();
//       $(this).replaceWith("<td><select id='statusDrop'><option value='checkedIn'>Checked In</option><option value='checkedOut'>Checked Out</option></select></td>");
//     }
//     else if($(this).attr('class') === 'condition'){
//       var value = $(this).text();
//       $(this).replaceWith("<td><select id='conditionDrop'><option value='5'>5 (best)</option><option value='4'>4</option><option value='3'>3</option><option value='2'>2</option><option value='1'>1 (worst)</option><option value='incomplete'>Incomplete</option></select></td>");
//     }
//   });
//   $('#stopEditing').show();
// });
// $('#stopEditing').click(function(e){
//   e.preventDefault();
//   for(var x = 0; x<userArray.length; x++){
//     if(userArray[x].username === loggedInUser){
//       for(var y = 0; y<userArray[x].games.length; y++){
//         if(userArray[x].games[y].gameName === "" || userArray[x].games[y].gameName === "undefined"){
//           console.log("blank found");
//           userArray[x].games.splice(y,y);
//         }
//         else{
//           console.log("blank not found");
//         }
//       }
//     }
//   }
//   $('td').each(function(){
//     console.log($(this));
//     if($(this).attr('class') === 'title'){
//     var value = $(this).val();
//       for(var x = 0; x<userArray.length; x++){
//         if(userArray[x].username === loggedInUser){
//           for(var y = 0; y<userArray[x].games.length; y++){
//             if(userArray[x].games[y].gameName != value){
//               userArray[x].games[y].gameName = value;
//             }
//           }
//         }
//       }
//     }
//     if($(this).attr('class') === 'nop'){
//     var value = $(this).val();
//       for(var x = 0; x<userArray.length; x++){
//         if(userArray[x].username === loggedInUser){
//           for(var y = 0; y<userArray[x].games.length; y++){
//             if(userArray[x].games[y].numberOfPlayers != value){
//               userArray[x].games[y].numberOfPlayers = value;
//             }
//           }
//         }
//       }
//     }
//     if($(this).attr('class') === 'status'){
//     var value = $(this).val();
//       for(var x = 0; x<userArray.length; x++){
//         if(userArray[x].username === loggedInUser){
//           for(var y = 0; y<userArray[x].games.length; y++){
//             if(userArray[x].games[y].gameStatus != value){
//               userArray[x].games[y].gameStatus = value;
//             }
//           }
//         }
//       }
//     }
//     if($(this).attr('class') === 'condition'){
//     var value = $(this).val();
//       for(var x = 0; x<userArray.length; x++){
//         if(userArray[x].username === loggedInUser){
//           for(var y = 0; y<userArray[x].games.length; y++){
//             if(userArray[x].games[y].gameCondition != value){
//               userArray[x].games[y].gameCondition = value;
//             }
//           }
//         }
//       }
//     }
//     if($(this).attr('class') != 'addGame'){
//       value = $(this).find('input').val();
//       if(value === ""){
//         value = $(this).find('input').attr('placeholder');
//         console.log(value);
//       }
//       $(this).replaceWith('<td>'+value+'</td>');
//     }
//   });
//   console.log(userArray);
//   $('#stopEditing').hide();
//   saveUsers();
// });
