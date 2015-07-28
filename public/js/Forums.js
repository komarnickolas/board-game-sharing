$(document).ready(function(){
  $('Username').hide();
  $('#Loginbtn').click(function(){
    console.log('clicked');
    window.location.href = "#openModal";
  )};

var Feedback = function(name, comments) {
  this.name = name;
  this.comments = comments;
  this.arr = [];
};

Feedback.prototype.display = function() {
  var cell = document.createElement('tr');
  var table = document.getElementById('comments');
  cell.innerHTML = this.name;
  table.appendChild(cell);
};

$('#btn').click(function(){
    console.log("clicked");
    var user = document.getElementById('user').value;
    var comment = document.getElementById('comment').value;
    var newcomment = [name, comments];
    var post = new Feedback(newcomment[0], newcomment[1]);
    post.display();
)};

)};
