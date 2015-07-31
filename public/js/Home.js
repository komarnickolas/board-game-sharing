$(document).ready(function() {
    $('#Loginbtn').click(function() {
        console.log('clicked');
        window.location.href = "#openModal";
    });
    localStorage.setItem('SearchQuery', "");
    $('#submitbtn').click(function() {
        var searchQuery = $('#inputbox').val();
        console.log(searchQuery);
        localStorage.setItem('SearchQuery', searchQuery);
        window.location.href = "Search.html";
    });
});
$('#searchbtn').click(function(e) {
    e.preventDefault();
    var query = $('#title').val();
    $('#title').val("");
    for (var z = 0; z < tableSize; z++) {
        $('#newrow' + z).remove();
    }
    for (var x = 0; x < userArray.length; x++) {
        for (var y = 0; y < userArray[x].games.length; y++) {
            if (userArray[x].games[y].gameName.toLowerCase() === query.toLowerCase()) {
                addRow(x, y);
                console.log('found');
            } else {
                $('#newrow' + y).remove();
                console.log('not found');
            }
        }
    }
});
