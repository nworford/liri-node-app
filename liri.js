// //At the top of the liri.js file, write the code you need to grab the data from keys.js. Then store the keys in a variable.

var keys = require('./keys');
let twitterKeys = require('./keys').twitterKeys;
let spotifyKeys = require('./keys').spotifyKeys;
let omdbKey = require('./keys').omdbKey;

console.log(keys.twitterKeys);
console.log(keys.spotifyKeys);
console.log(keys.omdbKey);

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var client = new Twitter(twitterKeys);
 
// Make it so liri.js can take in one of the following commands:

// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says

// node liri.js my-tweets
// This will show your last 20 tweets and when they were created at in your terminal/bash window.
var nodeArgs = process.argv[2];

if (nodeArgs === 'my-tweets') {
 client.get('statuses/user_timeline', function(error, tweets, response) {
    if(error) throw error;
    
    console.log(response);  // Raw response object. 
  });
}

// node liri.js spotify-this-song '<song name here>'
// This will show the following information about the song in your terminal/bash window

// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from

// Client ID 22d67a4af3ea4982b12c9c26fd556066
// Client Secret acd184d190bd419db59de23938e185fc

// If no song is provided then your program will default to "The Sign" by Ace of Base.

// node liri.js movie-this '<movie name here>'

// This will output the following information to your terminal/bash window:

//    * Title of the movie.
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.
   
//    If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'//
