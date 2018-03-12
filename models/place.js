// Import Mongoose
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.plugin(schema => {
    schema.options.usePushEach = true
});
mongoose.connect("mongodb://localhost/maps");


// Schema Setup
const placeSchema = new mongoose.Schema({
    name: String,
    description: String,
    coords: {
        lat: Number,
        lng: Number
    },
    image: []

});


// Create model with method
module.exports = mongoose.model("Place", placeSchema);