const {Schema, model} = require('mongoose');

module.exports = model("Anime",
    new Schema({
        name: String,
        type: String,
        img:String,
        genres: [{
            type: Schema.Types.ObjectId,
            ref: "Genre"
        }],
        comments: [{
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }]
    }))