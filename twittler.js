$(document).ready(function(){
  var $body = $('body');
  $body.html('');

  // var index = streams.home.length - 1;

  var pollForTweets = function() {
    var prevLength = 0;
    var compareLength = function() {
      var currLength = streams.home.length;

      if (currLength > prevLength) {
        // trigger event
        $body.trigger('newTweets', [currLength, prevLength]);
        prevLength = currLength;
      }
    };
    setInterval(compareLength, 500);
  };

  var displayTweet = function(index) {
    var tweet = streams.home[index];
    var $tweet = $('<div></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($body);
  };

  var displayTweets = function(event, currLength, prevLength){
    var delta;
    if (prevLength === 0) {
      delta = 0;
    } else {
      delta = prevLength - 1;
    }
    for (var i = currLength - 1; i >= currLength - delta ; i--) {
      displayTweet(i);
    }
  };

  pollForTweets();

  $body.on('newTweets', displayTweets);
});