var forumsStatus = [];
var forumCollection ="/collections/forums/55b84bdbe4b0230ce90fe0d7";
$(document).ready(function(){
  $.ajax({
    url: db + forumCollection+ apiKey,
    type:'GET',
    success: console.log("Connected to database")
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

    var tt = document.createElement('td');
    tt.innerHTML = t;
    var btn = document.createElement('button');
    var t = document.createTextNode('Delete');
    btn.appendChild(t);
    row.appendChild(btn);
    table.appendChild(row);
    btn.addEventListener('click', deleteRow);

  };
  getForumsStatus();
  $('Username').hide();
  $('#Loginbtn').click(function(){
    console.log('clicked');
    window.location.href = "#openModal";
  });
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
        success: console.log('successful data save')
      });
  });
  function deleteRow(e) {
    console.dir(e);
  }
  $('#del').click(function(){
    document.getElementById('table').deleteRow(-1);
  });

  function getForumsStatus(){
    var fs = $.ajax({
      url: db + forumCollection + apiKey,
      type: "GET",
      async: false,
    	contentType: "application/json",
    	dataType: 'json',
    	success: function(data)
      	{
          dataReceived(data);
          console.log("Success");
          console.dir(data);
      	}
    });
    function dataReceived(data) {
    console.dir(data);
    // var existingForums = JSON.parse(fs.responseText);
    // console.log(existingForums.forums.forumsStatus);
    forumsStatus = data.forums.forumsStatus;
    for(var x = 0; x<forumsStatus.length;x++){
      var popForum = new Feedback(forumsStatus[x].name, forumsStatus[x].comments);
      popForum.display();
    }

  }
}
});
