const express = require("express");
const router = express.Router();
const User = require("./mod/user");
const bcrypt = require("bcrypt");
const session = require("express-session");

router.post("/", async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({
    $or: [{ email: login }, { phone: login }],
  });
  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      req.session.userId = user._id;
      return res.sendStatus(200);
    }
    return res.status(400).json({ error: "Invalid Password" });
  }
  return res.status(401).json({ error: "User does not exist" });
});

module.exports = router;
