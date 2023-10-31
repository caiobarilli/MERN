require("dotenv").config();
const { validationResult } = require("express-validator");
const { body } = require("express-validator");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validate = require("../../middleware/validate");
const auth = require("../../middleware/auth");
const User = require("../../models/User");

const router = express.Router();

/**
 * @desc    Auth API endpoint
 * @route   GET /api/auth
 * @access  Public
 */
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.mesage);
    res.status(500).send("Server error");
  }
});

/**
 * @desc    Auth API endpoint
 * @route   post /api/auth
 * @access  Public
 */
router.post(
  "/",
  validate([
    body("email", "Please include a valid email").isEmail(),
    body(
      "password",
      "Please enter a password with 6 or more characters",
    ).isLength({ min: 6 }),
  ]),
  async (req, res) => {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      // Check if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        },
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
);

module.exports = router;
