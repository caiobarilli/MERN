const express = require("express");
const router = express.Router();

/**
 * @desc    Posts API endpoint
 * @route   GET /api/users
 * @access  Public
 */
router.get("/", (req, res) => res.send("Posts Route"));

module.exports = router;
