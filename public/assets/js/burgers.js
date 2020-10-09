$(function() {

    $(".create-form").on("submit", function (event) {
        event.preventDefault()
        var newBurger = {
            burger_name: $("#burgerName").val().trim(),
            devoured: 0
        };

        $.ajax({
            url: "/api/burgers",
            type: "POST",
            data: newBurger
        }).then(function () {
            location.reload();
        });
    });

    $(".devourBtn").on("click", function (event) {
        var id = $(this).data("id");

        var nowDevoured = {
            devoured: 1
        }

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: 
            nowDevoured
        }).then(function () {
            location.reload();
        });
    });
});