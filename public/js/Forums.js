var forumsStatus = [];
var forumCollection ="/collections/forums/55b84bdbe4b0230ce90fe0d7";
$(document).ready(function(){
  $.ajax({
    url: db + forumCollection+ apiKey,
    type:'GET',
    success: console.log("Connected to database")
  });
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
      forumsStatus.push(newcomment);
      console.log(forumsStatus);
      var data = JSON.stringify({forums: {forumsStatus}});
      console.log(data);
      console.log(db+collection+apiKey);
      $.ajax({
        url:db+forumCollection+apiKey,
        method: 'PUT',
        data: data,
        contentType: 'application/json',
        success: console.log('success')
      });
  });
});
