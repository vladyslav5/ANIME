const {Schema, model} = require('mongoose');

module.exports = model("Comment",
    new Schema({
        userId : {
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        text:String,
        animeId: {
            type: String
        },
        answers:[{
            type:Schema.Types.ObjectId,
            ref:"Comment"
        }]
    }))