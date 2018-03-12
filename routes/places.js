const express = require("express"),
    request = require("request"),
    bodyParser = require("body-parser"),
    Place = require("../models/place"),
    router = express.Router();

// Maps show
router.get("/", (req, res) => {
    Place.find({}, (err, foundplaces) => {
        if (err) {
            res.redirect("back");
        } else {
            res.render("places/index", {
                foundplaces: foundplaces
            });
        }
    });
});

// Live comment
// users = [];
// connections = [];

// io.sockets.on("connection", (socket) => {
//     connections.push(socket);
//     console.log("Connected %s", connections.length)
// });
// io.sockets.on("connection", (socket) => {
//     connections.push(socket);
//     console.log("Connected %s", connections.length);
// });


// Pass data to server
router.post("/", (req, res) => {
    Place.find({}, (err, foundplaces) => {
        if (err) {
            res.redirect("back");
        } else {
            res.send(foundplaces);
        }
    });
});

// Mark visited place
router.get("/new", (req, res) => {
    res.render("places/new");
});

router.post("/new", (req, res) => {
    var place = req.body.place;

    Place.create({
        name: place.name,
        coords: place.coords,
        description: place.description
    }, (err, newPlace) => {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            newPlace.image.push(place.image);
            newPlace.save();
            console.log(newPlace);
            res.redirect("back");
        }
    });
});

// Request data
router.get("/:id", (req, res) => {
    Place.findById(req.params.id, (err, foundplace) => {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.send(foundplace);
        }
    })

});

module.exports = router;