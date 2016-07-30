var five = require('johnny-five');
var songs = require('j5-songs');

var board = new five.Board();
var songList = [
    "beethovens-fifth",
    "claxon",
    "do-re-mi",
    "doorbell",
    "funeral-march-short",
    "jingle-bells-short",
    "jingle-bells",
    "mario-fanfare",
    "mario-intro",
    "never-gonna-give-you-up",
    "nyan-intro",
    "nyan-melody",
    "pew-pew-pew",
    "starwars-theme",
    "tetris-theme",
    "wedding-march"
]

board.on('ready', function () {
    var piezo = new five.Piezo(3);
    var button = new five.Button(2);
    var potentiometer = new five.Sensor({
        pin: "A0",
        freq: 250
    });
    var songChoice = 0;

    potentiometer.on("change", function() {
        songChoice = Math.floor(this.value/1024.0*16)
        console.log(this.value, this.raw);
    });

    board.repl.inject({
        button: button,
        pot: potentiometer
    });

    button.on("down", function() {
        if(!piezo.isPlaying) {
            piezo.play(songs.load(songList[songChoice]));
            // piezo.play(songs.load('mario-intro'), function(){
            //     piezo.play(songs.load('mario-fanfare'));
            // });
        }
    })
});
