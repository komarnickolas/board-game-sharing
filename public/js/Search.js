$(document).ready(function(){
  $('#Loginbtn').click(function(){
    console.log('clicked');
    window.location.href = "#openModal";
  });
  var retrievedSearchQuery = localStorage.getItem('SearchQuery');
  if(retrievedSearchQuery != null){
    console.log(retrievedSearchQuery);
  }
  var tableSize = 0;
  for(var x = 0; x<userArray.length; x++){
    for(var y = 0; y<userArray[x].games.length; y++){
      addRow(x,y);
      tableSize++;
    }
  }
  $('#searchbtn').click(function(e){
    e.preventDefault();
    var query = $('#title').val();
    $('#title').val("");
    for(var z = 0; z<tableSize; z++){
      $('#newrow'+z).remove();
    }
    for(var x = 0; x<userArray.length; x++){
      for(var y = 0; y<userArray[x].games.length; y++){
        if(userArray[x].games[y].gameName.toLowerCase() === query.toLowerCase()){
          addRow(x,y);
          console.log('found');
        }
        else{
          $('#newrow'+y).remove();
          console.log('not found');
        }
      }
    }
  });
  function addRow(x,y){
    $('#content').append('<tr id="newrow'+y+'"></tr>');
    $('#newrow'+y).append('<td id="'+y+'">'+userArray[x].games[y].gameName+'</td>');
    $('#newrow'+y).append('<td>'+userArray[x].games[y].numberOfPlayers+'</td>');
    $('#newrow'+y).append('<td>'+userArray[x].games[y].gameCondition+'</td>');
    $('#newrow'+y).append('<td>'+userArray[x].games[y].gameStatus+'</td>');
    $('#newrow'+y).append('<td>'+userArray[x].username+'</td>');
    $('#newrow'+y).append('<td><button name="'+y+'">I want this game</button></td>');
  }
  $('button').click(function(e){
    e.preventDefault();
    var btnpressed = $(this).attr('name');
    var rowSelected = $('#'+btnpressed).text();
    console.log(rowSelected);
  });
});
