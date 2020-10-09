var router = require("express").Router();

var burgers = require("../models/burger.js");

router.get("/", function (req, res) {
    burgers.selectAll(function (data) {
        res.render("index", { burgers: data })
    });
});

router.post("/api/burgers", function (req, res) {
    burgers.insertOne(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function (data) {
        res.json(data)
    });
});

router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    burgers.updateOne({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;