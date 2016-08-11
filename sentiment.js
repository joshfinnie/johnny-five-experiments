// adds .env file to Environment... awesome package!
require('dotenv').config();

var five = require("johnny-five");
var sentiment = require('sentiment');
var Twitter = require('twitter');

// Initalize board
var board = new five.Board();

// Initalize Twitter Client
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// Looking for a command line variable
// i.e. $ node sentiment.js "NodeBotsDay"
var args = process.argv.slice(2);
if(!args[0]){
    console.log("Need a command line variable!");
    process.exit();
}

board.on("ready", function (){
    // Initialize the LED using the correct pins...
    var anode = new five.Led.RGB({
        pins: {
            red: 11,
            green: 10,
            blue: 9
        },
    });
    
    // Create a stream of tweets based on user inputed search term.
    client.stream('statuses/filter', {track: args[0]},  function(stream) {
        
        // On tweet, calculate sentiment and update LED color.
        stream.on('data', function(tweet) {
            var color = "#000000";
            var sentimentScore = (sentiment(tweet.text).score);
            console.log(tweet.text, sentimentScore);
            if(sentimentScore < 0){
                color = "#FF0000";
            } else if(sentimentScore == 0) {
                color = "#000000";
            } else {
                color = "#0000FF";
            }
            anode.color(color);
        });

        // Catch errors... what errors?
        stream.on('error', function(error) {
            console.log(error);
        });
    });
});
