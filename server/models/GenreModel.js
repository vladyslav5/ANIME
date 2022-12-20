const {Schema, model} = require('mongoose');

module.exports = model("Genre",
    new Schema({
        name: String,
        description: String
    }))