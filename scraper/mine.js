const Twit = require('twit');
const serverUrl = "http://35.185.4.76:3000";
const path = require('path');
const fs = require('fs');
var request = require('request');
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./localstorage');

// If not provided a search term by user error
var searchTerm;
if(process.argv[2]){
  searchTerm = process.argv[2];
} else {
  console.log("Error: please provide query");
  process.exit();
}

// Directory to save is based on search term
var dataDirectory = 'data/' + searchTerm+'.csv';
const filePath = path.join(__dirname, dataDirectory);

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

    var tweets = [];
    data.statuses.forEach(function(tweet) {
      tweets.push(tweet.text);
    });
    var tweetsObj = {};
    tweetsObj.tweets = tweets;
    // TODO post to server here
    request({
        url: serverUrl,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: tweetsObj
	},
        function (error, response, body) {
          if (error) {
            return console.error('upload failed:', error);
          }
	  console.log(body);
	  saveToCsv(body);
        }
    );

    // TODO in repsonse append to a text file, repeat
    
    // process results
    data.statuses.forEach(function(tweet) {
      // Just send text to server
      saveToCsv('"' + tweet.text + '"' + ", 0\n");
    });

  }
}

// Save to CSV
function saveToCsv(text) {
  fs.appendFile(filePath, text, function(err) {
      if(err) {
        return console.log(err);
      }
  });
}

