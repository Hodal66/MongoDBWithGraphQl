const {model,Schema} = require("mongoose");

const userRegisterSchema = new Schema({
    fullName:String,
    email:String,
    sex:String,
    ages:Number,
    password:String,
    confirmPassword:String,
    createdAt:String,
})

module.exports = model("UserRegister",userRegisterSchema);

