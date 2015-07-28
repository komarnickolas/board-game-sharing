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
  var table = document.getElementById('table');
  var row = document.createElement('tr');

  var td = document.createElement('td');
  td.innerHTML = this.name;
  row.appendChild(td);
  table.appendChild(row);

  var comm = document.createElement('td');
  comm.innerHTML = this.comments;
  row.appendChild(comm);
  table.appendChild(row);
};
$('#btn').click(function(){
    var user = document.getElementById('user').value;
    var comment = document.getElementById('comment').value;
    var newcomment = new Feedback(user, comment);
    newcomment.display();
});
});
