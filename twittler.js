$(document).ready(function(){
  var newTweetsCount = 0;
  var timeLine = streams.home;
  var currLength, prevLength;
  var $newTweets = $('.new-tweets');
  var $newTweetsCount = $('.new-tweets-count');


  var pollForTweets = function() {
    var compareLength = function() {
      var updateNewTweetsCount = function(currLength, prevLength) {
         newTweetsCount = newTweetsCount + (currLength - prevLength);
         $newTweetsCount.text(String(newTweetsCount));
      };

      currLength = timeLine.length;
      if (currLength > prevLength) {
        $newTweets.slideDown();
        updateNewTweetsCount(currLength, prevLength);
        prevLength = currLength;
      }
    };
    prevLength = timeLine.length;
    setInterval(compareLength, 500);
  };

  var clearNewTweetsCount = function() {
    $newTweetsCount.text('0');
    $newTweets.slideUp();
  };

  var displayTweet = function(index) {
    var tweet = timeLine[index];
    var $tweet = $('<div></div>');
    var $tweetContainer = $('<div></div>');
    var $tweetHeader = $('<h4><a class="user">@' + tweet.user + '</a><span class="t-s">' + tweet.created_at.toLocaleString() + '</span></h4>');
    var $tweetBody = $('<div>' + tweet.message + '</div>');
    // var $userImg = $('')

    $tweetBody.addClass('media-body')
      .appendTo($tweet);
    $tweetHeader.addClass('media-heading')
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

  displayTweets(0, timeLine.length - 1);
  pollForTweets();

  // Register click handler on new-tweets div
  $('.new-tweets').click(function() {
    clearNewTweetsCount();
    displayTweets(currLength - newTweetsCount, currLength - 1);
    newTweetsCount = 0;
  });

  // now i need a click handler for the username link
  $('.time-line').on('click', '.user', function() {
    alert('word');
    return false;
  });

});