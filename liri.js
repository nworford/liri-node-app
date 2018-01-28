// //At the top of the liri.js file, write the code you need to grab the data from keys.js. Then store the keys in a variable.

var keys = require('./keys');
var twitterKeys = require('./keys').twitterKeys;
var spotifyKeys = require('./keys').spotifyKeys;
var omdbKey = require('./keys').omdbKey;



var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

 
// Make it so liri.js can take in one of the following commands:

// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says

// node liri.js my-tweets
// This will show your last 20 tweets and when they were created at in your terminal/bash window.
var client = new Twitter(twitterKeys);
var command = process.argv[2];

if (command === 'my-tweets') {

  var params = {screen_name: 'nfl'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log("Tweets");
      for (i = 0; i < 20; i++) {
        
        console.log("created at: ", tweets[i].created_at);
        console.log("text: ",tweets[i].text);
        console.log("----------------------------------")
      }
    }
  });
}

 

// node liri.js spotify-this-song '<song name here>'
// This will show the following information about the song in your terminal/bash window
// var nodeArgs = process.argv[2];
// var nodeArgsSong = process.arg[3];


if (command === 'spotify-this-song') {
  var spotify = new Spotify(spotifyKeys);
  var song = process.argv[3];
  var params = { type: 'track', query: song }
  var cb =  function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("spotify-this-song");
    console.log(data);
  }
  spotify.search(params, cb)
}
// // Artist(s)
// // The song's name
// // A preview link of the song from Spotify
// // The album that the song is from

// // Client ID 22d67a4af3ea4982b12c9c26fd556066
// // Client Secret acd184d190bd419db59de23938e185fc

// // If no song is provided then your program will default to "The Sign" by Ace of Base.

// // node liri.js movie-this '<movie name here>'

// // This will output the following information to your terminal/bash window:

// //    * Title of the movie.
// //    * Year the movie came out.
// //    * IMDB Rating of the movie.
// //    * Rotten Tomatoes Rating of the movie.
// //    * Country where the movie was produced.
// //    * Language of the movie.
// //    * Plot of the movie.
// //    * Actors in the movie.
   
// //    If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'//
