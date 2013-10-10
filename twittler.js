$(document).ready(function(){
  var newTweetsCount = 0;
  var homeStream = streams.home;
  var currLength, prevLength;
  var $newTweets = $('.new-tweets');
  var $newTweetsCount = $('.new-tweets-count');

  var pollForTweets = function(stream) {
    $newTweets.hide();     // Hide the new tweets div until new ones arrive
    var compareLength = function() {
      var updateNewTweetsCount = function(currLength, prevLength) {
         newTweetsCount = newTweetsCount + (currLength - prevLength);
         $newTweetsCount.text(String(newTweetsCount));
      };

      currLength = stream.length;
      if (currLength > prevLength) {
        $newTweets.slideDown();
        updateNewTweetsCount(currLength, prevLength);
        prevLength = currLength;
      }
    };
    prevLength = stream.length;
    setInterval(compareLength, 500);
  };

  var displayTweet = function(stream, index, parentNode) {
    var tweet = stream[index];
    var fromNow = moment(tweet.created_at).fromNow();
    var avatars = {
      shawndrost: 'img/alien.jpg',
      sharksforcheap: 'img/boba_fet.jpg',
      mracus: 'img/sendak.jpg',
      douglascalhoun: 'img/hell_boy.jpg',
      visitor: 'img/spiderman.jpg'
    };
    var avatar = avatars.visitor;

    if (avatars.hasOwnProperty(tweet.user)) {
      avatar = avatars[tweet.user];
    }

    $([
        '<div class="list-group-item">',
        '<div class="media">',
        '<a class="pull-left">',
        '<img class="media-object" src="' + avatar + '"></a>',
        '<div class="media-body">',
        '<h4 class="media-heading"><a href="#userModal" class="user">@',
        '' + tweet.user + '</a><span class="t-s">' + fromNow,
        '</span></h4>',
        '' + tweet.message + '</div>',
        '</div>',
        '</div>'
      ].join(''))
        .prependTo($(parentNode));
  };

  var displayTweets = function(stream, startIdx, endIdx, parentNode){
    for (var i = startIdx; i <= endIdx; i++) {
      displayTweet(stream, i, parentNode);
    }
  };

  var clearNewTweetsCount = function() {
    $newTweetsCount.text('0');
    $newTweets.slideUp();
  };

  /* Updates the timeline with the latest tweets when this div is clicked
   * ======================================================================== */
  $newTweets.click(function() {
    clearNewTweetsCount();
    displayTweets(homeStream, currLength - newTweetsCount, currLength - 1, '.time-line');
    newTweetsCount = 0;
    return false;
  });
  
  /* A modal is used to display the timeline of a different user.  Activated
   * when the username is clicked
   * ======================================================================== */
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
    $modal.modal({ show: true });
    return false;
  });

  /* User Login & Tweet Input UI
   * ======================================================================== */
  $('.tweet-form').hide();
  $('.login-form button[type="submit"]').click(function() {
    var $username = $(this).prev().children('#username');
    var $form = $(this).parent();
    var username = $username.val();

    if (username) {
      window.visitor = username;
      $username.val('');
      $form.slideUp();
      $form.parent().prev().children('h3').text('@' + username);
      $form.next().slideDown();
    }
    return false;
  });

  $('.tweet-form button[type="submit"]').click(function() {
    var $tweetInput = $(this).prev().children('.tweet-input');

    writeTweet($tweetInput.val());
    $tweetInput.val('');
    // Delay the tirggering of the click event that updates the timeline to allow my polling function
    // to capture the newly created tweet.
    setTimeout(function() {
      $newTweets.trigger('click');
    }, 500);
    return false;
  });

 /* MAIN
  * ======================================================================== */ 
  displayTweets(homeStream, 0, homeStream.length - 1, '.time-line');
  pollForTweets(homeStream);
});