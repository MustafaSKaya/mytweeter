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

    function renderTweets(data) {

        data.forEach((obj) => {

            $(createTweetElement(obj)).appendTo("#mainbody");

        });
    };

    $("#tweetform").submit(function(event) {

        console.log( $( this ).serialize());

        event.preventDefault();

        $.ajax({
            url: 'http://localhost:3000/tweets',
            method: 'POST',
            data: $(this).serialize()
        })
        .then(function() {
            console.log();
            
        })
    });

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
      
});