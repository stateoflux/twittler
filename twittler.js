$(document).ready(function(){
  var newTweetsCount = 0;
  var $newTweetsCount = $('#new-tweets-count');

  var pollForTweets = function() {
    var prevLength = 10;

    var compareLength = function() {
      var currLength = streams.home.length;

      var updateNewTweetsCount = function(currLength, prevLength) {
         newTweetsCount = newTweetsCount + (currLength - prevLength);
         $newTweetsCount.text(String(newTweetsCount));
      };

      if (currLength > prevLength) {
        // trigger event
        // $body.trigger('newTweets', [currLength, prevLength]);
        updateNewTweetsCount(currLength, prevLength);
        prevLength = currLength;
      }
    };
    setInterval(compareLength, 500);
  };

  var clearNewTweetsCount = function() {
    newTweetsCount = 0;
    $newTweetsCount.text('0');
    // event.preventDefault();
  };

  var displayTweet = function(index) {
    var tweet = streams.home[index];
    var $tweet = $('<div></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message + tweet.created_at);
    $('.time-line').prepend($tweet);
    // $tweet.appendTo($body);
  };

  /* var displayTweets = function(event, currLength, prevLength){
    var delta;
    if (prevLength === 0) {
      delta = 0;
    } else {
      delta = prevLength - 1;
    }
    for (var i = currLength - 1; i >= delta ; i--) {
      displayTweet(i);
    }
  }; */

  var index = streams.home.length - 1;

  for (var i = index; i > 0; i--) {
    displayTweet(i);
  }

  // Register click handler on new-tweets div
  $('.new-tweets').click(function() {
    clearNewTweetsCount();

    // display new tweets
  });

  pollForTweets();
});