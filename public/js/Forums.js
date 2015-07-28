$(document).ready(function(){
  $('Username').hide();
  $('#Loginbtn').click(function(){
    console.log('clicked');
    window.location.href = "#openModal";
  });

var Feedback = function(name, comments) {
  this.name = name;
  this.comments = comments;
};

Feedback.prototype.display = function() {
  var row = document.createElement('tr');
  var td = document.createElement('td');
  var comm = document.createElement('td');
  var table = document.getElementById('comments');
  td.innerHTML = this.name;
  row.appendChild(td);
  table.appendChild(row);
};
// td append to row
$('#btn').click(function(){
    var user = document.getElementById('user').value;
    var comment = document.getElementById('comment').value;
    var newcomment = new Feedback(user, comment);
    console.dir(newcomment);
    newcomment.display();


});


});
