const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
  },
  { collection: "posts" }
);

const Post = mongoose.model("kitten", postSchema);

module.exports = { Post };
