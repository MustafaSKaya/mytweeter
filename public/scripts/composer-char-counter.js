$(document).ready(function() {

  $("#tweet-text").on('keyup', function() {
    let wordLimit = 140 - $(this).val().length;
    let counter = $(this).siblings('div').find('.counter');
    counter.html(wordLimit);
    if (wordLimit < 0) {
      counter.addClass("excessive_count");
    } else if (wordLimit >= 0) {
      counter.removeClass("excessive_count");
    }
  });
});