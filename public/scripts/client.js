/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

    const escape = function (str) {
        let div = document.createElement("div");
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    };

    const createTweetElement = (obj) => {

        const time = timeago.format(obj.created_at);

        const safeHTML = `<p>${escape(obj.content.text)}</p>`;

        const newTweet = `
            
              <article class="tweet">
                <header>
                  <img src=${obj.user.avatars}>
                  <h4>${obj.user.name}</h4>
                  <span class="handle">${obj.user.handle}</span>
                </header>
                <div class="inner-tweets">
                  ${safeHTML}
                </div>
                <footer class="tweet-footer">
                ${time}
                <span>
                  <i class="fas fa-flag"></i>
                  <i class="fas fa-retweet"></i>
                  <i class="fas fa-heart"></i>
                </span>
                </footer>
              </article>`

        return newTweet;
    };

    const $errorMessage = $('#error-message');
    $errorMessage.hide();

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
            $('.error').text('Too long. Plz respect our arbitrary character limit of 140!');
            $errorMessage.slideDown(500);
            setTimeout(() => { $errorMessage.slideUp(500) }, 7000);
            return
        } else if (newTweetLength <= 0) {
            $('.error').text('You can not send an empty tweet!');
            $errorMessage.slideDown(500);
            setTimeout(() => { $errorMessage.slideUp(500) }, 7000);
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


