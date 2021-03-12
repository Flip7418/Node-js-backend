const express = require("express");
const router = express.Router();
const User = require("./mod/user");
const bcrypt = require("bcrypt");
const session = require("express-session");

const data = async (req, res, next) => {
  console.log(req.session.userId);
  const user = await User.findOne({ _id: req.session.userId });
  req.user = user; // delete the password from the session
  next();
};

router.get("/", data, (req, res) => {
  /*const user = req.user*/
  const user = {
    name: req.user.name,
    phone: req.user.phone,
    email: req.user.email,
    image: req.user.image,
  };
  res.json(user);
});
module.exports = router;
