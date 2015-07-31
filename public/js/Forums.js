var forumsStatus = [];
var forumCollection = "/collections/forums/55b84bdbe4b0230ce90fe0d7";
var userArray = [];
var user = function(u, p) {
    this.username = u;
    this.password = p;
    this.pingged = [false, 0];
    this.games = [];
}
var game = function(n, s, c, p, i) {
    this.gameName = n;
    this.gameStatus = s;
    this.gameCondition = c;
    this.numberOfPlayers = p;
    this.gameId = i;
}
var db = 'https://api.mongolab.com/api/1/databases/users';
var collection = "/collections/usernames/55b6862ae4b077bc38f60527";
var apiKey = '?apiKey=CmxO8Pu1HeEpa6MSJyWa3ceKlKExom1_';
$(document).ready(function() {
    $.ajax({
        url: db + forumCollection + apiKey,
        type: 'GET',
        success: console.log("Connected to database")
    });
    var Feedback = function(name, comments, sender) {
        this.name = name;
        this.comments = comments;
        this.sender = sender;
    };
    Feedback.prototype.display = function(spot) {
        $('#content').append('<tr id="newrow' + spot + '"></tr>');
        $('#newrow' + spot).append('<td id="name' + spot + '">' + this.name + '</td>');
        $('#newrow' + spot).append('<td>' + this.comments + '</td>');
        $('#newrow' + spot).append('<td>' + this.sender + '</td>');
        $('#newrow' + spot).append('<button id="' + spot + '"> <image src="css/resources/minus.png"></image></button>');
    };
    getForumsStatus();
    $('Username').hide();
    $('#Loginbtn').click(function() {
        console.log('clicked');
        window.location.href = "#openModal";
    });
    $('#btn').click(function(e) {
        e.preventDefault();
        var newcomment = new Feedback($('#user').val(), $('#comment').val(), $('#sender1').val());
        newcomment.display();
        forumsStatus.push(newcomment);
        console.log(forumsStatus);

        var data = JSON.stringify({
            forums: {
                forumsStatus
            }
        });
        console.log(data);
        console.log(db + collection + apiKey);
        $.ajax({
            url: db + forumCollection + apiKey,
            method: 'PUT',
            data: data,
            contentType: 'application/json',
            success: console.log('successful data save')
        });

    });
    $('button').click(function() {
        console.log('clicked');
        var btnpressed = $(this).attr('id');
        console.log(btnpressed);
        for (var x = 0; x < forumsStatus.length; x++) {
            if (forumsStatus[x].name === $('#name' + btnpressed).text()) {
                $(this).parent().remove();
                console.log(forumsStatus[x].name);
                forumsStatus.splice(x, x);
                console.log(forumsStatus);
                var data = JSON.stringify({
                    forums: {
                        forumsStatus
                    }
                });
                console.log(data);
                console.log(db + collection + apiKey);
                $.ajax({
                    url: db + forumCollection + apiKey,
                    method: 'PUT',
                    data: data,
                    contentType: 'application/json',
                    success: console.log('successful data save')
                });
                break;
            }
        }
    });

    function getForumsStatus() {
        var fs = $.ajax({
            url: db + forumCollection + apiKey,
            type: "GET",
            async: false,
            contentType: "application/json",
            dataType: 'json',
            success: function(data) {
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
            for (var x = 0; x < forumsStatus.length; x++) {
                var popForum = new Feedback(forumsStatus[x].name, forumsStatus[x].comments, forumsStatus[x].sender);
                popForum.display(x);
            }
        }
    }
});
