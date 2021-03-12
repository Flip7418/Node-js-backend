const express = require("express");
const path = require("path");
const app = express();
app.listen(5000);
app.use(express.json());
const posts = [];
app.get("/posts", function (req, res) {
  res.json(posts);
});
app.post("/posts", function (req, res) {
  posts.push({
    content: req.body.content,
    title: req.body.title,
  });

  res.sendStatus(201);
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.use(express.urlencoded({ extended: true }));
