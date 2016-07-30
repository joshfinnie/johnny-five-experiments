var five = require('johnny-five');
var songs = require('j5-songs');

var board = new five.Board();

board.on('ready', function () {
    var piezo = new five.Piezo(3);
    var button = new five.Button(2);

    board.repl.inject({
        button: button
    });

    button.on("down", function() {
        if(!piezo.isPlaying) {
            // piezo.play(songs.load('never-gonna-give-you-up'));
            piezo.play(songs.load('mario-intro'), function(){
                piezo.play(songs.load('mario-fanfare'));
            });
        }
    })
});
