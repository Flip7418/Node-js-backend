const express = require("express");
const main = express();
const mongoose = require("mongoose");
const path = require("path");
require("dotenv/config");
const session = require("express-session");

// Static
main.use("/uploads", express.static(path.join(__dirname, "uploads")));

main.use(
  session({
    name: "qid",
    secret: "dogs are cute",
    maxAge: 2 * 60 * 60 * 1000, //2hours
  })
);

//conn
main.use(express.json());

const registr = require("./registration");
main.use("/registration", registr);

const login = require("./login");
main.use("/login", login);

const profile = require("./profile");
main.use("/profile", profile);

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected")
);
main.listen(5001);
