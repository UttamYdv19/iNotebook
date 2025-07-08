const express = require("express");
const User = require("../modules/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const Secrate_key = "12@qiqi";

// ROUTE 1 : Creating a User Using : POST "api/auth/createduser" , No login required
router.post(
  "/createduser",
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("username must be 3 character"),
    body("email").isEmail().withMessage("please enter valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be 6 character"),
  ],
  async (req, res) => {
    try {
      let result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).send({succes:false},"validation err");
      }
      // Check weather the user with this email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .send({succes:false, error: "user with this email is already existed" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      let data = { name: req.body.name };
      const authToken = jwt.sign(data, Secrate_key);
      // Create a new user
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      return res.status(200).send({succes:true,authToken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send({succes:false},"Internal server error");
    }
  }
);

// ROUTE2 : Authenticate a User using : POST "api/auth/login" , No login required
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("please enter valid email"),
    body("password") .isLength({ min: 3 }).withMessage("password can not be blank"),
  ],
   async(req, res) => {
    let succes = false;
    let result = await validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).json(succes,"validation err");
    }
    let { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (!user)
        return res.status(400).json({ error: "user not found signUp first!!" });
      else {
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass)
          return res.status(400).json({ error: "user not found " });

        const data = { user: { id: user.id } };
        const authToken = jwt.sign(data, Secrate_key);
        res.status(200).send({succes:true,authToken});
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send(succes,"Internal server error");
    }
  }
);

// ROUTE2 : Get loggedin a User details using : POST "api/auth/getuser" , login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
