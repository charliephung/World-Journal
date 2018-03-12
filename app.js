// ===================
// Require Framework
const express = require("express"),
    request = require("request"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

var app = express();

// ===================
// Require Framework for Authenticating
const passport = require("passport"),
    passportLocal = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    expressSession = require("express-session");



// ===================
// Require Models
const Place = require("./models/place");
const User = require("./models/user");

// PASSPORT CONFIG
app.use(expressSession({
    secret: "phung ba hiep",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Require Routes
const indexRoutes = require("./routes/index");
const placeRoutes = require("./routes/places");

// Setting up Mongoose
mongoose.Promise = global.Promise;
mongoose.plugin(schema => {
    schema.options.usePushEach = true
});
mongoose.connect("mongodb://localhost/maps");

// APP CONFIQ
// View engine
// Serve pulic
// Body parser
// Using route
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Send infomation to all page
app.use((req, res, next) => {
    res.locals.user = req.user;
    // Moving onto next callback
    next();

})

app.use(indexRoutes);
app.use("/map", placeRoutes);


app.listen(8000, () => {
    console.log("Server Up!");
});