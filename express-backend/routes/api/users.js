require("dotenv").config();
const { validationResult } = require("express-validator");
const { body } = require("express-validator");
const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const validate = require("../../middleware/validate");

const router = express.Router();

/**
 * @desc    Register users API endpoint
 * @route   POST /api/users
 * @access  Public
 */
router.post(
  "/",
  validate([
    body("name", "Name is required.").not().isEmpty(),
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

    // Check if user exists
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }

    // Get users gravatar
    const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" }, true);

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    user = new User({
      name,
      email,
      avatar,
      date: Date.now(),
      password: hashedPassword,
    });

    await user.save();

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
  },
);

module.exports = router;
