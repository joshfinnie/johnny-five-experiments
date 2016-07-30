var five = require('johnny-five');
var songs = require('j5-songs');

var board = new five.Board();
var songList = [
    "beethovens-fifth", // 0-63
    "claxon", // 64-127
    "do-re-mi", // 128-191
    "doorbell", // 192-255
    "funeral-march-short", // 256-319
    "jingle-bells-short", // 320-383
    "jingle-bells", // 384-447
    "mario-fanfare", // 448-511
    "mario-intro", // 512-575
    "never-gonna-give-you-up", // 576-639
    "nyan-intro", // 640-703
    "nyan-melody", // 704-767
    "pew-pew-pew", // 768-831
    "starwars-theme", // 832-895
    "tetris-theme", // 896-959
    "wedding-march" // 960-1023
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
