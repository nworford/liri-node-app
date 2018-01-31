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

  var params = {screen_name: 'nathanworford'};
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

    else() {
      var songInfo = data.tracks.items;
      for (var i = 0; i < 5; i++) {
        if (songInfo[i] != undefined) {
            var spotifyResults =
            "Artist: " + songInfo[i].artists[0].name + "\r\n" +
            "Song: " + songInfo[i].name + "\r\n" +
            "Album the song is from: " +songInfo[i].album.name + "\r\n" +
            "Preview Url: " + songInfo[i].preview_url + "\r\n" +
            "---------------------" + i + "-----------------------" + "\r\n"
            console.log(spotifyResults);

        }
      }
      
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
 // Movie function, uses the Request module to call the OMDB api
 function movieThis(){
  var movie = process.argv[3];
  if(!movie){
    movie = "mr nobody";
  }
  params = movie
  request("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var movieObject = JSON.parse(body);
      //console.log(movieObject); // Show the text in the terminal
      var movieResults =
      "------------------------------ begin ------------------------------" + "\r\n"
      "Title: " + movieObject.Title+"\r\n"+
      "Year: " + movieObject.Year+"\r\n"+
      "Imdb Rating: " + movieObject.imdbRating+"\r\n"+
      "Country: " + movieObject.Country+"\r\n"+
      "Language: " + movieObject.Language+"\r\n"+
      "Plot: " + movieObject.Plot+"\r\n"+
      "Actors: " + movieObject.Actors+"\r\n"+
      "Rotten Tomatoes Rating: " + movieObject.tomatoRating+"\r\n"+
      "Rotten Tomatoes URL: " + movieObject.tomatoURL + "\r\n" + 
      "------------------------------ fin ------------------------------" + "\r\n";
      console.log(movieResults);
      log(movieResults); // calling log function
    } else {
      console.log("Error :"+ error);
      return;
    }
  });
};  
// //    If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'//

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data){
    if (!error) {
      doWhatItSaysResults = data.split(",");
      spotifyThisSong(doWhatItSaysResults[0], doWhatItSaysResults[1]);
    } else {
      console.log("Error occurred" + error);
    }
  });
};
// Do What It Says function, uses the reads and writes module to access the log.txt file and write everything that returns in terminal in the log.txt file
function log(logResults) {
  fs.appendFile("log.txt", logResults, (error) => {
    if(error) {
      throw error;
    }
  });
}