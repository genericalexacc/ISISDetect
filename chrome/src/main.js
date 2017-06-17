var tweetArray = [];
var regex = /(<([^>]+)>)/ig;
$(".js-tweet-text-container p").each(function(i) {
  console.log(i);
  var tweet = {};
  tweet.id = i;
  $(this).attr("id","isis" + i);
  tweet.text = $(this).html().replace(regex, "");
  tweetArray.push(tweet);
});

var tweets_post = {};
tweets_post.tweets = tweetArray;
console.log(tweets_post);
