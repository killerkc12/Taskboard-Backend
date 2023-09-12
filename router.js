const express = require("express");
const { SignIn, SignUp } = require("./routes/auth");
const router = express.Router();

router.get("/signin", (req, res) => SignIn(req, res));
router.post("/signup", (req, res) => SignUp(req, res));

module.exports = router;
