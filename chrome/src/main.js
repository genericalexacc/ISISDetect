// Variables
var serverUrl = "http://35.185.4.76:3000";
var tweetArray = [];
var regex = /(<([^>]+)>)/ig;
var reportBtn = '<div class="ProfileTweet-action js-toggleState"> <button class="ProfileTweet-actionButton js-actionButton reportToServer" type="button">🚫 false positive</button></div>';

// Get each tweet, record and apply effects
// TODO this should be inside return function after posting to server
$(".js-tweet-text-container p").each(function(i) {
  var tweet = {};
  var random = Math.round(Math.random()*100) + 1;
  tweet.id = i;
  $(this).parent().attr("id","isis" + i);
  if(random>90) $(this).parent().attr("class", "isisAlert monitorTweet");
  else if(random>70) $(this).parent().attr("class", "isisWarning monitorTweet");
  else $(this).parent().attr("class","monitorTweet");
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
  var tweet = $(".monitorTweet p")[$('.reportToServer').index(this)].innerHTML.replace(regex, "");
  var realVal = prompt("Enter value to send server (1-100)");
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
    url: serverUrl,
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
