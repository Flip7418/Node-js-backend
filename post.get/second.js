const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

app.use(express.json());

const postsRoute = require("./routes/posts");

app.use("/posts", postsRoute);

app.get("/", (req, res) => {
  res.send("home");
});

mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true }, () =>
  console.log("connected")
);

app.listen(3000);
