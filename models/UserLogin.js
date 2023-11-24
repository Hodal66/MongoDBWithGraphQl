const {model,Schema} = require('mongoose');
const userLoginSchema = new Schema({
    email:String,
    password:String,
    token:String
});
module.exports = model("UserLogin", userLoginSchema);