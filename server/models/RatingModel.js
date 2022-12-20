const {Schema, model} = require('mongoose');

module.exports = model("Rating",
    new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        grade: Number
    }))