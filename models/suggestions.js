// REQUIREMENTS
const mongoose = require('mongoose');

// SCHEMA 
const suggestionsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    img: {type: String},
    description: {type: String, required: true},
    price: {type: String, required: true},
    artist: {type: String, required: true}
})

// CREATING COLLECTION 
const Suggestion = mongoose.model('Suggestion', suggestionsSchema);

//EXPORTING  COLLECITON 
module.exports = Suggestion;