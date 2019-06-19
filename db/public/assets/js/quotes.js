
$(function () {
  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newQuote = {
      author: $("#auth").val().trim(),
      quote: $("#quo").val().trim(),
      images: $("#upload").val().trim()
    };
    console.log("new qute", newQuote);
    // Send the POST request.
    $.ajax("/api/quotes", {
      type: "POST",
      data: newQuote
    }).then(
      function () {
        console.log("created new quote");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".update-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var updatedQuote = {
      author: $("#auth").val().trim(),
      quote: $("#quo").val().trim(),
      images: $("#upload").val().trim()

    };


    var id = $(this).data("id");

    // Send the POST request.
    $.ajax("/api/quotes/" + id, {
      type: "PUT",
      data: updatedQuote
    }).then(
      function () {
        console.log("updated quote");
        // Reload the page to get the updated list
        location.assign("/");
      }
    );
  });
});