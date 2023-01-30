const express = require("express");
const { default: mongoose } = require("mongoose");
const User = require("../models/User");

const router = express.Router();

//create user using POST: "/api/auth" Doesnot required AUTH
router.post("/", (req, res) => {
  console.log(req.body);
  const user = User(req.body);
  user.save();
  res.send(req.body);
});

module.exports = router;
