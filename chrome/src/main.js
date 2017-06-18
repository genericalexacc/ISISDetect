// Variables
var serverUrl = "https://www.json-server.dev";
var tweetArray = [];
var regex = /(<([^>]+)>)/ig;
var reportBtn = '<div class="ProfileTweet-action js-toggleState"> <button class="ProfileTweet-actionButton js-actionButton reportToServer" type="button">false positive</button></div>';

// Get each tweet, record and apply effects
// TODO this should be inside return function after posting to server
$(".js-tweet-text-container p").each(function(i) {
  var tweet = {};
  var random = Math.round(Math.random()*100) + 1;
  tweet.id = i;
  $(this).parent().attr("id","isis" + i);
  if(random>90) $(this).parent().attr("class", "isisAlert");
  else if(random>70) $(this).parent().attr("class", "isisWarning");
  tweet.text = $(this).html().replace(regex, "");
  tweetArray.push(tweet);
});

// Append report false positive button
$(".ProfileTweet-actionList").each(function(i) {
  $(this).append(reportBtn);
});

// TODO Send false report to server
$(".reportToServer").click(function(i) {
  $(this).css("color", "red");
  var tweet = $(".isisAlert p")[$('.reportToServer').index(this)].innerHTML.replace(regex, "");
  postFalsePositive(tweet);
});

// Put tweets array into an array
var tweets_post = {};
tweets_post.tweets = tweetArray;
postTweets(tweetArray);

// Post tweets to server
function postTweets(tweets) {
  $.ajax({
    type: "POST",
    url: serverUrl + "/tweets",
    data: tweets,
    //success: success,
    dataType: "json"
  });
}

// Post report to server
function postFalsePositive(tweet) {
  console.log(tweet);
  $.ajax({
    type: "POST",
    url: serverUrl + "/report",
    data: tweet,
    //success: success,
    dataType: "json"
  });
}
