$(document).ready(function(){
  var newTweetsCount = 0;
  var homeTimeLine = streams.home;
  var currLength, prevLength;
  var $newTweets = $('.new-tweets');
  var $newTweetsCount = $('.new-tweets-count');


  var pollForTweets = function(timeLine) {
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

  var displayTweet = function(timeLine, index, parentNode) {
    var tweet = timeLine[index];
    var $tweet = $('<div></div>');
    var $tweetContainer = $('<div></div>');
    var $tweetHeader = $('<h4><a href="#userModal" class="user">@'
      + tweet.user + '</a><span class="t-s">' + tweet.created_at.toLocaleString()
      + '</span></h4>');
    var $tweetBody = $('<div>' + tweet.message + '</div>');
    // var $userImg = $('')

    $tweetBody.addClass('media-body')
      .appendTo($tweet);
    $tweetHeader.addClass('media-heading')
      .prependTo($tweetBody);
    $tweet.addClass('media')
      .appendTo($tweetContainer);
    $tweetContainer.addClass('list-group-item')
      .prependTo($(parentNode));
  };

  var displayTweets = function(timeLine, startIdx, endIdx, parentNode){
    for (var i = startIdx; i <= endIdx; i++) {
      displayTweet(timeLine, i, parentNode);
    }
  };

  var clearNewTweetsCount = function() {
    $newTweetsCount.text('0');
    $newTweets.slideUp();
  };

  // Register click handler on new-tweets div
  $('.new-tweets').click(function() {
    clearNewTweetsCount();
    displayTweets(homeTimeLine, currLength - newTweetsCount, currLength - 1, '.time-line');
    newTweetsCount = 0;
    return false;
  });

  $('.time-line').on('click', '.user', function() {
    var handle = $(this).text();
    var userTl = streams.users[handle.slice(1)];
    var startIdx = 0;
    var $modal = $([
      '<div class="modal fade" id="userModal" tabindex="-1" role="dialog" aria-labelledby="userModalLabel" aria-hidden="true">',
      '<div class="modal-dialog">',
      '<div class="modal-content">',
      '<div class="modal-header">',
      '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
      '<h4 class="modal-title">' + handle + '\'s Timeline</h4>',
      '</div>',
      '<div class="modal-body"><ul class="list-group md-time-line">',
      '</ul></div>',
      '</div>',
      '</div>',
      '</div>'
      ].join(''));

    if (userTl.length > 20) {
      startIdx = userTl.length - 20;
    }

    displayTweets(userTl, startIdx, userTl.length - 1, $modal.find('.md-time-line'));
    $modal.modal({
      show: true
    });

    // change the timeLine reference
    // might be easier to just create a modal.
    // clear newTweetsCount
    return false;
  });

  displayTweets(homeTimeLine, 0, homeTimeLine.length - 1, '.time-line');
  pollForTweets(homeTimeLine);
});