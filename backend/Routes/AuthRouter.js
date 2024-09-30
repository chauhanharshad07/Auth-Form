const { signup ,login } = require("../Controller/AuthController");
const { signupValidation, loginValidation } = require("../Middleware/AuthValidation");

const router = require("express").Router();

// Login route with placeholder logic
router.post("/login", loginValidation, login);

// Signup route with validation middleware
router.post("/signup", signupValidation, signup);


module.exports = router;
