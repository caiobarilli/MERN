require("dotenv").config();

const express = require("express");
const conn = require("./config/db");
const app = express();

/**
 * @desc Connect to database
 */
conn();

/**
 * @desc Home route
 */
app.get("/", (req, res) => res.send("API v1.0.0"));

/**
 * @desc Middleware
 */
app.use(express.json({ extended: false }));

/**
 * @desc Routes
 */
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/users", require("./routes/api/users"));

/**
 * @desc Express server listening on port 5000
 */
// eslint-disable-next-line no-undef
app.listen(process.env.port || 5000, () =>
  console.warn(`Server running on port ${process.env.port || 5000}`),
);
