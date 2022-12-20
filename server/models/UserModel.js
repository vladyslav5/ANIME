const {Schema, model} = require('mongoose');

module.exports = model("User",
    new Schema({
        email:String,
        regDate:String,
        password:String,
        avatar:String,
        header:String,
        roles: [{
            type: String,
            ref:"Role"
        }],
        collections:[{
            type:Schema.Types.ObjectId,
            ref:"Collection"
        }]
    }))