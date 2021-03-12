const express = require("express");
const router = express.Router();
const User = require("./mod/user");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const verify = async (req, res, next) => {
  const user1 = await User.findOne({
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
  });
  if (user1) {
    res.status(400).send("User exists");
  } else {
    next();
  }
};

router.post("/", upload.single("image"), verify, async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    image: req.file.filename,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  console.log(req.file);
  try {
    const saveuser = await user.save();
    res.json({ message: "User added" });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
