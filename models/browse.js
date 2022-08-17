// Requirements 
const mongoose = require('mongoose');

//Schema 
const browseSchema = new mongoose.Schema({
    name: { type: String, required: true},
    image: {type: String},
    description: {type: String},
    price: { type: Number, required: true},
});

//Creating our collection 
const Item = mongoose.model('Item', browseSchema);

//Exporting to our Server.js
module.exports = Item;