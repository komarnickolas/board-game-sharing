$(document).ready(function(){
  $('#Loginbtn').click(function(){
    console.log('clicked');
    window.location.href = "#openModal";
  });
  var retrievedSearchQuery = localStorage.getItem('SearchQuery');
  if(retrievedSearchQuery != null){
    console.log(retrievedSearchQuery);
    $('#title').val(retrievedSearchQuery);
  }
  var tableSize = 0;
  var userSize = 0;
  for(var x = 0; x<userArray.length; x++){
    userSize++;
    for(var y = 0; y<userArray[x].games.length; y++){
      addRow(x,y);
      tableSize++;
    }
  }
  $('#searchbtn').click(function(e){
    e.preventDefault();
    var queryT = $('#title').val();
    var queryMN = $('#minDrop').val();
    var queryMX = $('#maxDrop').val();
    var queryS = $('#statusDrop').val();
    var queryC = $('#conditionDrop').val();
    $('#title').val("");
    $('#minDrop').val("minimum 1");
    $('#maxDrop').val("maximum 1");
    $('#statusDrop').val("Checked in");
    $('#conditionDrop').val("5(best)");
    for(var z = 0; z<userSize; z++){
      console.log(z);
      for(var a = 0; a<tableSize; a++){
        console.log(a);
      $('#newrow'+z+a).remove();
      }
    }
    for(var x = 0; x<userArray.length; x++){
      for(var y = 0; y<userArray[x].games.length; y++){
        if(queryT != ""){
          if(userArray[x].games[y].gameName.toLowerCase() === queryT.toLowerCase()){
            addRow(x,y);
          }
          else{
              $('#newrow'+x+y).remove();
          }
        }
        else if (queryMN+"-"+queryMX != '1-1'){
          if(userArray[x].games[y].numberOfPlayers === queryMN+"-"+queryMX){
            addRow(x,y);
          }
          else{
              $('#newrow'+x+y).remove();
          }
        }
        else{
          if(userArray[x].games[y].gameStatus === queryS){
            console.log(userArray[x].games[y].gameStatus);
            addRow(x,y);
          }
          else{
              $('#newrow'+x+y).remove();
          }
        }
      }
    }
  });
  function addRow(x,y){
    $('#content').append('<tr id="newrow'+x+y+'"></tr>');
    $('#newrow'+x+y).append('<td id="'+y+'">'+userArray[x].games[y].gameName+'</td>');
    $('#newrow'+x+y).append('<td>'+userArray[x].games[y].numberOfPlayers+'</td>');
    $('#newrow'+x+y).append('<td>'+userArray[x].games[y].gameCondition+'</td>');
    $('#newrow'+x+y).append('<td>'+userArray[x].games[y].gameStatus+'</td>');
    $('#newrow'+x+y).append('<td id="userSelected'+x+'">'+userArray[x].username+'</td>');
    $('#newrow'+x+y).append('<td><button name="'+x+'">I want this game</button></td>');
  }
  $('button').click(function(e){
    e.preventDefault();
    var btnpressed = $(this).attr('name');
    console.log(btnpressed);
    var rowSelected = $('#'+btnpressed).text();
    console.log(rowSelected);
    var userSelected = $('#userSelected'+btnpressed).text();
    console.log(userSelected);
    for(var x = 0; x<userArray.length; x++){
      if(userSelected === userArray[x].username){
        userArray[x].pingged[0] = true;
        userArray[x].pingged[1] += 1;
        console.log(userArray[x].pingged);
        saveUsers();
      }
    }
  });
});
