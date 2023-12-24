const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { FindUserById } = require('../routes/auth');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "you must logged in fist" });
  }
  const token = authorization.replace("Bearer ", "");
  // Wrap jwt.verify in a Promise to use async/await
  const verifyToken = () => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
          reject(err);
        } else {
          resolve(payload);
        }
      });
    });
  };

  try {
    const payload = await verifyToken();
    const { _id } = payload;

    // Use FindUserById with async/await
    const userdata = await FindUserById(_id);

    req.user = {
      _id: userdata._id,
      name: userdata.name,
      email: userdata.email,
      photo: userdata.photo,
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: "you must log in first" });
  }
};
