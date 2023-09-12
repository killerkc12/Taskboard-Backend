const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
// const requireLogin = require("../middleware/requireLogin");

router.post("/signup", async (req, res) => {
  const { name, email, password, photo } = req.body;
  if (!name || !email || !password || !photo) {
    return res.status(422).json({ error: "All fields are required" });
  }

  try {
    const isUserExist = await User.findOne({ email: email })
    console.log(isUserExist);
    if (isUserExist) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = new User({
      name,
      email,
      password,
      photo,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const userResponse = await user.save();
    console.log(userResponse);
    if (userResponse) {
      res.json({ message: 'Signup successful' });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/signin', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Fields are empty" });
  }
})

module.exports = router;
