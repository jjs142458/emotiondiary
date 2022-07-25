const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 5000;

//mjchoi12

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Post } = require("./Model/Post.js");
app.listen(port, () => {
  mongoose
    .connect(
      `mongodb+srv://sosorry:mjchoi12@cluster0.9raso.mongodb.net/Community?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("connecting MongoDB...");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.post("/api/test", (req, res) => {
  const CommunityPost = new Post({
    title: "제목은 몰라요",
    content: String(12312),
  });
  CommunityPost.save().then(() => {
    res.status(200).json({ success: true, text: "안녕하세요" });
  });
});
