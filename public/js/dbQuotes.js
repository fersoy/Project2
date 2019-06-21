$(document).ready(function () {
    $(function () {
        $(".create-form").on("submit", function (event) {
            // Make sure to preventDefault on a submit event.
            event.preventDefault();

            var newQuote = {
                author: $("#auth").val().trim(),
                quote: $("#quo").val().trim(),
                image: $("#upload").val().trim()
            };

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
            $(document).on("click", ".delquote", handleDeleteButtonPress);
            function handleDeleteButtonPress() {

                $.ajax({
                    method: "DELETE",
                    url: req.params.id
                })
                    .then(newQuote);
            }
        });
    });


});