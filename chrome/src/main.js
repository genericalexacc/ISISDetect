var tweetArray = [];
var regex = /(<([^>]+)>)/ig;
$(".js-tweet-text-container p").each(function() {
  var result = $(this).html().replace(regex, "");
  tweetArray.push(result);
});

console.log(tweetArray);
