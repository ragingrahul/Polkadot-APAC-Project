const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
require("dotenv").config();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../../models/users");

// @route   Post api/auth/check
// @desc    Validate Signature
// @access  Public
router.post("/check", auth, (req, res) => {
  try {
    res.json({ msg: "Logged In" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  "/",
  [
    check("sign", "Signature is required").not().isEmpty(),
    check("address", "Address is required").not().isEmpty(),
    check("evmAddress", "EVM Address is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    try {
      const user = await User.findOne({ address: req.body.address });
      if (!user) {
        const newUser = new User({
          address: req.body.address,
          evmAddress: req.body.evmAddress,
          following: [],
        });
        await newUser.save();
      }

      const payload = {
        sign: req.body.sign,
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
