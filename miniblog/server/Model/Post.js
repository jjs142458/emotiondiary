const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    postNum: Number,
  },
  { collection: "sssposts" }
);

const Post = mongoose.model("post", postSchema);

module.exports = { Post };
