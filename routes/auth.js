const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
// const requireLogin = require("../middleware/requireLogin");

const SignUp = async (req, res) => {
  const { name, email, password, photo } = req.body;
  if (!name || !email || !password || !photo) {
    return res.status(422).json({ error: "All fields are required" });
  }

  try {
    const alreadUser = await FindUser(email);
    if (alreadUser) {
      return res
        .status(422)
        .json({ error: "User is already exist with this email" });
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
    if (userResponse) {
      const token = CreateToken(userResponse._id);
      res.json(GetUserData(token, userResponse));
    }
  } catch (error) {
    console.log(error);
  }
};

const SignIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Fields are empty" });
  }

  try {
    const savedUser = await FindUser(email);
    if (!savedUser) {
      return res.status(422).json({ error: "Email or Password in invalid." });
    }
    const token = CreateToken(savedUser._id);
    res.json(GetUserData(token, savedUser));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const FindUser = async (email) => {
  const savedUser = await User.findOne({ email: email });
  return savedUser;
};

const CreateToken = (_id) => {
  return jwt.sign({ _id }, JWT_SECRET);
};

const GetUserData = (token, savedUser) => {
  return { token, user: { ...savedUser._doc } };
};

module.exports = { SignIn, SignUp };
