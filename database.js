const mongoose = require("mongoose")
const MONGODB =
  "mongodb+srv://mhthodol:Hodal123@cluster0.wda9huh.mongodb.net/";
exports.connectToDb = async ()=>{
    mongoose
  .connect(MONGODB)
  .then(() => {
    console.log("Mongo dabase is connected syccesfully");
  })

}