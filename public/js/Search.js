'use strict';
var userArray = [];
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
    $('#Loginbtn').click(function() {
        console.log('clicked');
        window.location.href = '#openModal';
    });
    var retrievedSearchQuery = localStorage.getItem('SearchQuery');
    if (retrievedSearchQuery !== null) {
        console.log(retrievedSearchQuery);
        $('#title').val(retrievedSearchQuery);
    }
    var tableSize = 0;
    var userSize = 0;

    function addRow(x, y) {
        $('#content').append('<tr id="newrow' + x + y + '"></tr>');
        $('#newrow' + x + y).append('<td id="' + y + '">' + userArray[x].games[y].gameName + '</td>');
        $('#newrow' + x + y).append('<td>' + userArray[x].games[y].numberOfPlayers + '</td>');
        $('#newrow' + x + y).append('<td>' + userArray[x].games[y].gameCondition + '</td>');
        $('#newrow' + x + y).append('<td>' + userArray[x].games[y].gameStatus + '</td>');
        $('#newrow' + x + y).append('<td id="userSelected"' + x + '">' + userArray[x].username + '</td>');
        $('#newrow' + x + y).append('<td><button name="' + x + '">Poke Owner</button></td>');
    }
    for (var x = 0; x < userArray.length; x++) {
        userSize++;
        for (var y = 0; y < userArray[x].games.length; y++) {
            addRow(x, y);
            tableSize++;
        }
    }
    $('#searchbtn').click(function(e) {
        e.preventDefault();
        var queryT = $('#title').val();
        var queryMN = $('#minDrop').val();
        var queryMX = $('#maxDrop').val();
        var queryS = $('#statusDrop').val();
        for (var z = 0; z < userSize; z++) {
            console.log(z);
            for (var a = 0; a < tableSize; a++) {
                console.log(a);
                $('#newrow' + z + a).remove();
            }
        }
        for (var x = 0; x < userArray.length; x++) {
            for (var y = 0; y < userArray[x].games.length; y++) {
                if (queryT !== '') {
                    if (userArray[x].games[y].gameName.toLowerCase() === queryT.toLowerCase()) {
                        addRow(x, y);
                    } else {
                        $('#newrow' + x + y).remove();
                    }
                } else if (queryMN + '-' + queryMX !== '1-1') {
                    if (userArray[x].games[y].numberOfPlayers === queryMN + '-' + queryMX) {
                        addRow(x, y);
                    } else {
                        $('#newrow' + x + y).remove();
                    }
                } else {
                    if (userArray[x].games[y].gameStatus === queryS) {
                        console.log(userArray[x].games[y].gameStatus);
                        addRow(x, y);
                    } else {
                        $('#newrow' + x + y).remove();
                    }
                }
            }
        }
    });
    $('button').click(function(e) {
        e.preventDefault();
        var btnpressed = $(this).attr('name');
        console.log(btnpressed);
        var rowSelected = $('#' + btnpressed).text();
        console.log(rowSelected);
        var userSelected = $('#userSelected' + btnpressed).text();
        console.log(userSelected);
        for (var x = 0; x < userArray.length; x++) {
            if (userSelected === userArray[x].username) {
                userArray[x].pingged[0] = true;
                userArray[x].pingged[1] += 1;
                console.log(userArray[x].pingged);
                saveUsers();
            }
        }
    });
});
