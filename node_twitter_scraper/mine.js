const Twit = require('twit');
// See config file for values needed on setup
const config = require('./config/config');

// If not provided a search term by user thorough an error
var searchTerm, jsonData;
if(process.argv[2]){
  searchTerm = process.argv[2];
} else {
  console.log("Error: please provide query");
  process.exit();
}

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
    //since_id: jsonData.lastReplied
  }

Bot.get('search/tweets', query, processTweets);

function processTweets(error, data, response) {
  if (error) {
    console.log('Bot could not find latest tweet, : ' + error);
  } else {
    console.log(data);
  }
}
