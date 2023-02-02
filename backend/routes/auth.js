const express = require("express");
const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();

const JWT_SECRET = "Harshisagood$boy";

//ROUTE 1 - create user using POST: "/api/auth/createUser" Doesnot required AUTH
router.post(
  "/createUser",
  body("email", "Enter a Valid Email").isEmail(),
  body("name", "Enter a valid name").isLength({ min: 3 }),
  body("password", "Password must be at least 5 characters").isLength({
    min: 5,
  }),
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    //if there are errors, return bad request and errors
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
      //Check whether the user with this email exist already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success,error: "a user with this email already exist!! " });
      }
      //return a promise after creating user
      const salt = await bcrypt.genSalt(10);
      const secPasswd = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPasswd,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({ success,authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

//ROUTE 2 - Authenticate User /api/auth/login. No login required
router.post(
  "/login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success=false;
        return res
          .status(400)
          .json({ success,error: "Try to login with correct credentials invalid user" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success=false;
        return res
          .status(400)
          .json({ success,error: "Try to login with correct credentials, Password wrong" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
       success=true;
      res.json({ success,authToken });
    } catch (e) {
      console.log(e.message);
      res.status(500).send("Some error occured");
    }
  }
);

module.exports = router;

//ROUTE 3 - Get logged in user details using POST /api/auth/getUser. login required
/* send header with the name of authentication token to fetch the data from header and 
fetch */
router.post("/getUser",fetchUser, async (req, res) => {
  try {
     userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (e) {}
});
