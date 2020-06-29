const {Schema, model} = require("mongoose");

const movie = new Schema({
    //movieID is the unique key mongo db creates?
    title: {type: String, required: true},
    genre: {type: String, required: true},
    rating: {type: Number, required: true},
    releaseDate: {type: Date, required: true},

})
module.exports = model('movies', movie);