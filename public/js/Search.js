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
      $('#content').append('<tr id="newrow'+y+'"></tr>');
      $('#newrow'+y).append('<td id="'+y+'">'+userArray[x].games[y].gameName+'</td>');
      $('#newrow'+y).append('<td>'+userArray[x].games[y].numberOfPlayers+'</td>');
      $('#newrow'+y).append('<td>'+userArray[x].games[y].gameCondition+'</td>');
      $('#newrow'+y).append('<td>'+userArray[x].games[y].gameStatus+'</td>');
      $('#newrow'+y).append('<td>'+userArray[x].username+'</td>');
      tableSize++;
    }
  }
  $('#searchbtn').click(function(){
    var query = $('#searchinput').val();
    $('#searchinput').val("");
    for(var x = 0; x<tableSize; x++){
      var currentRow = $('#'+x).text();
      if(currentRow === query){
        console.log('found');
      }
      else{
        $('#newrow'+x).remove();
        console.log('not found');
      }
    }
  });
});
