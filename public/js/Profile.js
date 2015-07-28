$(document).ready(function(){
  $('#Loginbtn').hide();
  $('#addGame').hide();
  $('#addGameBtn').click(function(){
    $(this).fadeOut(1000);
    $('#addGame').fadeIn(2000);
  });
  $('#addGameForum').click(function(){
    console.log('adding game');
  });
});
