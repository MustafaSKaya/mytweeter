/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

    const createTweetElement = (obj) => {

        const time = timeago.format(obj.created_at);

        const newTweet = `
            <section class="tweets">
              <article class="tweet">
                <header>
                  <img src=${obj.user.avatars}>
                  <h4>${obj.user.name}</h4>
                  <span class="handle">${obj.user.handle}</span>
                </header>
                <div class="inner-tweets">
                  <p>${obj.content.text}</p>
                </div>
                <footer class="tweet-footer">
                ${time}
                <span>
                  <i class="fas fa-flag"></i>
                  <i class="fas fa-retweet"></i>
                  <i class="fas fa-heart"></i>
                </span>
                </footer>
              </article>
            </section>`

        return newTweet;
    };

    const renderTweets = function (data) {

        data.forEach((obj) => {

            $(createTweetElement(obj)).prependTo("#mainbody");

        });
    };

    const loadTweets = function() {
        $.ajax({
            url: 'http://localhost:3000/tweets',
            method: 'GET'
        })
        .then(function(data) {
            renderTweets(data);
        }); 
    };

    loadTweets()

    $("#tweetform").submit(function(event) {

        event.preventDefault();
        const newTweet = $('textarea').serialize();
        const newTweetLength = $('textarea').serialize().length - 5;
        const tweetLimit = 140;

        if (newTweetLength > tweetLimit) {
            alert('your tweet exceeds our character limit');
            return
        } else if (newTweetLength <= 0) {
            alert('you cant send an empty tweet');
            return
        }

        $.ajax({
            url: 'http://localhost:3000/tweets',
            method: 'POST',
            data: newTweet
        })
        .then(function() {
            $("#mainbody").empty();
            loadTweets(newTweet);
        })
    });
      
});


