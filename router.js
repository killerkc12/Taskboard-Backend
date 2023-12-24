const express = require("express");
const { SignIn, SignUp } = require("./routes/auth");
const { CreateBoard, GetAllBoard } = require("./routes/board");
const router = express.Router();
const requireLogin = require('./middleware/requireLogin');

router.get("/signin", (req, res) => SignIn(req, res));
router.post("/signup", (req, res) => SignUp(req, res));

router.post("/board", requireLogin, (req, res) =>
  CreateBoard(req, res)
);
router.get("/board", requireLogin, (req, res) => GetAllBoard(req, res));

module.exports = router;
