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
  var table = document.getElementById('comments');

  var td = document.createElement('td');
  td.innerHTML = this.name;
  row.appendChild(td);
  table.appendChild(row);

  var wow = document.getElementById('comment');
  var comm = document.createElement('td');
  comm.innerHTML = this.comments;
  comm.style = "display: inline";
  table.appendChild(comm);
  console.log(comm)

};
$('#btn').click(function(){
    var user = document.getElementById('user').value;
    var comment = document.getElementById('comment').value;
    var newcomment = new Feedback(user, comment);
    console.dir(newcomment);
    newcomment.display();
});
});
