var path = require("path");
var db = require("../models");
module.exports = function (app) {
    app.get("/", function (req, res) {
        db.Quote.findAll().then(function (dbQuote) {

            // console.log(dbQuote);
            // res.sendFile(path.join(__dirname, "../views/layouts"));
            res.render("index", { quotes: dbQuote });

        });
    });
};