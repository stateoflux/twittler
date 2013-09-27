$(document).ready(function(){
  var newTweetsCount = 0;
  var currLength, prevLength;
  var $newTweetsCount = $('#new-tweets-count');

  var pollForTweets = function() {
    var compareLength = function() {
      var updateNewTweetsCount = function(currLength, prevLength) {
         newTweetsCount = newTweetsCount + (currLength - prevLength);
         $newTweetsCount.text(String(newTweetsCount));
      };

      currLength = streams.home.length;
      if (currLength > prevLength) {
        updateNewTweetsCount(currLength, prevLength);
        prevLength = currLength;
      }
    };
    prevLength = streams.home.length;
    setInterval(compareLength, 500);
  };

  var clearNewTweetsCount = function() {
    $newTweetsCount.text('0');
  };

  var displayTweet = function(index) {
    var tweet = streams.home[index];
    var $tweet = $('<div></div>');
    var $tweetContainer = $('<div></div>');
    var $tweetHeader = $('<div></div>');
    var $tweetBody = $('<div></div>');
    // var $userImg = $('')

    $tweetBody.text(tweet.message)
      .addClass('media-body')
      .appendTo($tweet);
    $tweetHeader.text('@' + tweet.user)
      .addClass('media-heading')
      .prependTo($tweetBody);
    $tweet.addClass('media')
      .appendTo($tweetContainer);
    $tweetContainer.addClass('list-group-item')
      .prependTo($('.time-line'));
  };

  var displayTweets = function(startIdx, endIdx){
    for (var i = startIdx; i <= endIdx; i++) {
      displayTweet(i);
    }
  };

  displayTweets(0, streams.home.length - 1);
  pollForTweets();

  // Register click handler on new-tweets div
  $('.new-tweets').click(function() {
    clearNewTweetsCount();
    displayTweets(currLength - newTweetsCount, currLength - 1);
    newTweetsCount = 0;
  });

});