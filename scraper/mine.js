const Twit = require('twit');
const sentiment = require('sentiment');
const serverUrl = "http://localhost:3000";
var request = require('request');
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./query');

// If not provided a search term by user error
var searchTerm;
if(process.argv[2]){
  searchTerm = process.argv[2];
} else {
  console.log("Error: please provide query");
  process.exit();
}

// See config file for values needed on setup
const config = require('./config/config');

var Bot = new Twit({
  consumer_key: config.TWITTER_CONSUMER_KEY,
  consumer_secret: config.TWITTER_CONSUMER_SECRET,
  access_token: config.TWITTER_ACCESS_TOKEN,
  access_token_secret: config.TWITTER_ACCESS_TOKEN_SECRET
});

var query = {
  q: searchTerm,
  count: 100,
  result_type: "recent"
}

Bot.get('search/tweets', query, processTweets);

function processTweets(error, data, response) {
  if (error) {
    console.log('Bot could not find latest tweet, : ' + error);
  } else {

    // save time of last result
    localStorage.setItem('testObject', data.statuses[0].id);

    var tweets = data.statuses;
    console.log(tweets);
    // TODO post to server here
    request.post(
      serverUrl + "/tweets",
      tweets,
      function (error, response, body) {
        if (!error) {
          console.log(body)
        } else {
          console.log(response.statusCode);
          console.log(error);
	}
      }
    );

    // TODO in repsonse append to a text file, repeat
    
    // process results
    data.statuses.forEach(function(tweet) {
      // Just send text to server
      tweet.tSentiment = sentiment(tweet.text);
      //console.log(JSON.stringify(tweet.tSentiment) + " " + tweet.text);
    });

  }
}
