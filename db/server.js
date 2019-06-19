var express = require("express");
require('dotenv').config()
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var mysql = require("mysql");

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "MMM"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);
});

// Root get route.
app.get("/", function (req, res) {
    connection.query("SELECT * FROM quotes;", function (err, data) {
        if (err) {
            return res.status(500).end();
        }

        // Test it.
        // console.log('The solution is: ', data);

        // Test it.
        // res.send(data);

        res.render("index", { quotes: data });
    });
});
// Show the user the individual quote and the form to update the quote.
app.get("/:id", function (req, res) {
    connection.query("SELECT * FROM quotes where id = ?", [req.params.id], function (err, data) {
        if (err) {
            return res.status(500).end();
        }

        console.log(data);
        res.render("single-quote", data[0]);
    });
});
app.post("/api/quotes", function (req, res) {
    connection.query("INSERT INTO quotes (author, quote, images) VALUES (?, ?)", [req.body.author, req.body.quote, req.body.images], function (
        err,
        result
    ) {
        if (err) {
            // If an error occurred, send a generic server failure
            return res.status(500).end();
        }

        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
});

// Post route -> back to home
app.post("/", function (req, res) {


    connection.query("INSERT INTO quotes (quote) VALUES (?)", [req.body.quote], function (err, result) {
        if (err) {
            throw err;
        }

        res.redirect("/");
    });
});
// Update a quote by an id and then redirect to the root route.
app.put("/api/quotes/:author", function (req, res) {
    connection.query(
        "UPDATE quotes SET quote = '?', images = ?, author = ? WHERE author = ?",
        [req.body.author, req.body.quote, req.body.images],
        function (err, result) {
            if (err) {
                // If an error occurred, send a generic server failure
                return res.status(500).end();
            }
            else if (result.changedRows === 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            }
            res.status(200).end();

        }
    );
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});
