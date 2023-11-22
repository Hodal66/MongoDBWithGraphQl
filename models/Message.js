const {model, Schema} = require("mongoose");

const messageSchema = new Schema({
    title:String,
    author:String,
    createdAt:String,
});

module.exports = model("Message", messageSchema)