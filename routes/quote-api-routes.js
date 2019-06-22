
// Requiring our Todo model
var db = require("../models");


// Routes
// =============================================================
module.exports = function (app) {

    // GET route for getting all of the todos
    app.get("/", function (req, res) {
        // findAll returns all entries for a table when used with no options
        db.Quote.findAll({}).then(function (dbQuote) {
            // We have access to the todos as an argument inside of the callback function
            res.json(dbQuote);

        });
    });

    // POST route for saving a new todo
    app.post("/api/quotes", function (req, res) {
        console.log(req.body);
        // create takes an argument of an object describing the item we want to
        // insert into our table. In this case we just we pass in an object with a text
        // and complete property (req.body)
        db.Quote.create({
            author: req.body.author,
            quote: req.body.quote,
            image: req.body.image

        }).then(function (dbQuote) {
            // We have access to the new todo as an argument inside of the callback function
            res.render(dbQuote);
        })
            .catch(function (err) {
                // Whenever a validation or flag fails, an error is thrown
                // We can "catch" the error to prevent it from being "thrown", which could crash our node app
                res.json(err);
            });

    });
    app.delete("/api/quote/:id", function (req, res) {
        // We just have to specify which todo we want to destroy with "where"
        db.Quote.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbQuote) {
            res.json(dbQuote);
        });

    });

    // // PUT route for updating todos. We can get the updated todo data from req.body
    // app.put("/api/quotes", function (req, res) {

    //     // Update takes in an object describing the properties we want to update, and
    //     // we use where to describe which objects we want to update
    //     db.Quote.update({
    //         // id: req.body.integer,
    //         author: req.body.STRING,
    //         quote: req.body.STRING,
    //         image: req.body.STRING
    //     }, {
    //             where: {
    //                 id: req.body.id
    //             }
    //         }).then(function (dbQuote) {
    //             res.render(dbQuote);
    //         })
    //         .catch(function (err) {
    //             // Whenever a validation or flag fails, an error is thrown
    //             // We can "catch" the error to prevent it from being "thrown", which could crash our node app
    //             res.json(err);
    //         });
    // });


};