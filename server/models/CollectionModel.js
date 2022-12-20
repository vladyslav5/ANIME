const {Schema, model} = require('mongoose');

module.exports = model("Collection",
    new Schema({
        name:String,
        rating: {
            type: Schema.Types.ObjectId,
            ref: "Rating",
        },
        animes:[{
            type:String,
        }],
    }))