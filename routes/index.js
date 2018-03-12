const express = require("express"),
    request = require("request"),
    passport = require("passport"),
    User = require("../models/user"),
    router = express.Router();

// Landing page
router.get("/", (req, res) => {
    res.render("home");
});

// Register route
router.get("/signup", function (req, res) {
    res.render("signup");
});

// Register route
router.post("/signup", function (req, res) {
    // Create new user
    // Collection user name and password
    var data = req.body;
    // Store username to database first
    User.register(new User({
            username: data.username
        }),
        // Then store hashed password
        data.password, (err, user) => {
            if (err) {
                console.log(err);
                res.redirect("/signup");
            } else {
                // Use local stradegy
                passport.authenticate("local")(req, res, function () {
                    res.redirect("/map");
                });
            }
        });
});

// Login route
router.get("/login", (req, res) => {
    res.render("login");
});

// Login logic
// router.post("/login", passport.authenticate("local", {
//     successRedirect: "/map",
//     failureRedirect: '/',
// }), (req, res) => {});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/map",
    failureRedirect: "/login"
}), (req, res) => {});


// logout 
router.post("/logout", (req, res) => {
    req.logout();
    res.redirect('/map');
});

module.exports = router;