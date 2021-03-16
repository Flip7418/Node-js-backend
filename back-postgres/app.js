const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const session = require("express-session");

app.use(
  session({
    name: "qid",
    secret: "dogs are cute",
    maxAge: 2 * 60 * 60 * 1000, //2hours
  })
);

const userRouter = require("./routes/user.routes");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.Port || 8080;
app.use(express.json());
app.use("/api", userRouter);
app.listen(PORT, () => console.log("connected"));
