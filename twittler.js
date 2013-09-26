$(document).ready(function(){
  var $body = $('body');
  $body.html('');

  var index = streams.home.length - 1;
  
  var pollForTweets = function() {
    var prevLength = 0;
    var compareLength = function() {
      var currLength = streams.home.length;

      if (currLength > prevLength) {
        // trigger event
        prevLength = currLength;
      }

      setInterval(compareLength, 500);
    };
  };

  var displayTweet = function(index) {
    var tweet = streams.home[index];
    var $tweet = $('<div></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($body);
  };

  while(index >= 0) {
    displayTweet(index);
    index -= 1;
  }
});