const express = require("express");
const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const router = express.Router();

//create user using POST: "/api/auth/createUser" Doesnot required AUTH
router.post(
  "/createUser",
  body("email", "Enter a Valid Email").isEmail(),
  body("name", "Enter a valid name").isLength({ min: 3 }),
  body("password", "Password must be at least 5 characters").isLength({
    min: 5,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    //if there are errors, return bad request and errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //Check whether the user with this email exist already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "a user with this email already exist!! " });
      }
      //return a promise after creating user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      return res.json({ user });
    } catch(error) {
      console.log(error.message);
      res.status(500).send("Some error occured")
    } 
    
  }
);

module.exports = router;
