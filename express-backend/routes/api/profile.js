const express = require("express");
const router = express.Router();

/**
 * @desc    Profile API endpoint
 * @route   GET /api/users
 * @access  Public
 */
router.get("/", (req, res) => res.send("Profile Route"));

module.exports = router;
