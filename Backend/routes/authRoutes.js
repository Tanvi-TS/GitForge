const express = require("express");
const { signup, login } = require("../controllers/authController");
const validateBody = require("../middlewares/validateBody");

const router = express.Router();

// Signup
router.post("/signup", validateBody(["username", "email", "password"]), signup);

// Login
router.post("/login", validateBody(["email", "password"]), login);

module.exports = router;
