require('dotenv').config();

var five = require("johnny-five");
var sentiment = require('sentiment');
var Twitter = require('twitter');
 
var board = new five.Board();
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
 
board.on("ready", function (){
    client.stream('statuses/filter', {track: 'donald trump'},  function(stream) {
        stream.on('data', function(tweet) {
            var color = "#FFFFFF";
            var sentimentScore = (sentiment(tweet.text).score);
            if(sentimentScore < 0){
                color = "#FF0000";
            } else if(sentimentScore == 0) {
                color = "#00FF00";
            } else {
                color = "#0000FF";
            }
            var anode = new five.Led.RGB({
                pins: {
                    red: 11,
                    green: 10,
                    blue: 9
                },
            });
            anode.color(color);
        });

        stream.on('error', function(error) {
            console.log(error);
        });
    });
});
