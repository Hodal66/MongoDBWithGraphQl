const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  createdAt: {
    type: String,
    require: true,
  },
  author: {
    type: String,
  },
});

module.exports = model("Post", postSchema);

