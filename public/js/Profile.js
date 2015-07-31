'use strict';
var userArray = [];
var loggedInUser = localStorage.getItem('CurrentUser');
var game = function(n, s, c, p, i) {
    this.gameName = n;
    this.gameStatus = s;
    this.gameCondition = c;
    this.numberOfPlayers = p;
    this.gameId = i;
};
var db = 'https://api.mongolab.com/api/1/databases/users';
var collection = "/collections/usernames/55b6862ae4b077bc38f60527";
var apiKey = '?apiKey=CmxO8Pu1HeEpa6MSJyWa3ceKlKExom1_';
var saveUsers = function() {
    var data = JSON.stringify({
        username: {
            userArray
        }
    });
    console.log(data);
    console.log(db + collection + apiKey);
    $.ajax({
        url: db + collection + apiKey,
        method: 'PUT',
        data: data,
        contentType: 'application/json',
        success: function() {
            console.log('success');
        }
    });
};
$(document).ready(function() {
    $('#Loginbtn').hide();
    $('#stopEditing').hide();
    var number = 0;
    for (var x = 0; x < userArray.length; x++) {
        if (userArray[x].username === loggedInUser) {
            for (var y = 0; y < userArray[x].games.length; y++) {
                $('#tablebody').append('<tr id="newrow' + y + '"></tr>');
                $('#newrow' + y).append('<td id="title' + y + '">' + userArray[x].games[y].gameName + '</td>');
                $('#newrow' + y).append('<td id="nop' + y + '">' + userArray[x].games[y].numberOfPlayers + '</td>');
                $('#newrow' + y).append('<td id="status' + y + '""><select id="statusDrop"' + y + '><option value="checkedIn">Checked In</option><option value="checkedOut">Checked Out</option></select></td>');
                $('#newrow' + y).append('<td id="condition' + y + '">' + userArray[x].games[y].gameCondition + '</td>');
                // $('#newrow'+y).append('<button id=''+y+''> <image src='css/resources/minus.png'></image></button>');
            }
            if (userArray[x].pingged[0] === true) {
                $('#ping').append('<l>' + userArray[x].pingged[1] + '</l>');
            }
        }
    }
    $('select').change(function(){
      console.log($(this).val());
    });
    function render(t, s, c, n) {
        return '<tr id="' + number + '"><td>' + t + '</td><td>' + n + '</td><td>' + s + '</td><td>' + c + '</td></tr>';
    }
    console.log(number);
    $('#submitGamebtn').click(function(e) {
        e.preventDefault();
        console.log('adding game');
        var newGameTitle = $('#gamesTitle').val();
        var newMinGameNumberOfPlayers = $('#minDrop').val();
        var newMaxGameNumberOfPlayers = $('#maxDrop').val();
        var newGameStatus = $('#statusDrop').val();
        var newGameCondition = $('#conditionDrop').val();
        console.log(newGameTitle, newMinGameNumberOfPlayers + '-' + newMaxGameNumberOfPlayers, newGameStatus, newGameCondition);
        for (var x = 0; x < userArray.length; x++) {
            if (userArray[x].username !== localStorage.getItem('CurrentUser')) {
                number++;
            } else {
                break;
            }
        }
        console.log(number);
        userArray[number].games.push(new game(newGameTitle, newGameStatus, newGameCondition, newMinGameNumberOfPlayers + '-' + newMaxGameNumberOfPlayers, number));
        console.log(userArray[number]);
        $('#tablebody').append(render(newGameTitle, newGameStatus, newGameCondition, newMinGameNumberOfPlayers + '-' + newMaxGameNumberOfPlayers, number));
        saveUsers();
        $('#gamesTitle').val('');
        $('#gamesNumberOfPlayers').val('');
        $('#gamesStatus').val('');
        $('#gamesCondition').val('');
    });
});
