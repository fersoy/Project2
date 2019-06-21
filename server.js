require('dotenv').config();

var express = require("express");
var session = require("express-session");

var passport = require("./config/passport");

var exphbs = require("express-handlebars");
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.set("view engine", "handlebars");
app.set('views', __dirname + '/views');


// Routes
// =============================================================
require("./routes/htmlRoutes.js")(app);
require("./routes/quote-api-routes.js")(app);
require("./routes/login-html-routes")(app);
require("./routes/login-api-routes")(app);
// require("./routes/post-api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});
