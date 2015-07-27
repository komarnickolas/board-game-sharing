$(document).ready(function(){
  $('Username').hide();
  $('#Loginbtn').click(function(){
    console.log('clicked');
    window.location.href = "#openModal";
  });
});
var Feedback = function(user, comment) {
  this.user = user;
  this.comment = comment
}
Feedback.prototype.render = function() {
  var cell = document.createElement('tr');
  cell.id = this.user;
  var table = document.getElementById('comments');
  cell.innerHTML = this.user;
  table.appendChild(cell);
}

document.getElementById('btn').addEventListener('click'), function() {
  var user = document.getElementById('user').value;
  var comment = document.getElementById('comment').value;
  var addcom = [user, comment]
  var forum = new Feedback(addcom[0], addloc[1])
  forum.render();
  console.log("you wrote" + comment)
}
