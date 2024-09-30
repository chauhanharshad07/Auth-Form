const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists", success: false });
        }

        // Hash password and create new user
        const usermodel = new UserModel({ name, email, password });
        usermodel.password = await bcrypt.hash(password, 10);
        await usermodel.save();

        // Success response
        return res.status(201).json({ message: "Signup successful", success: true });
    } catch (error) {
        // Error response
        return res.status(500).json({ message: "Internal error", success: false });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const user = await UserModel.findOne({ email });
        const msg = "This email does not exist";
        if (!user) {
            return res.status(400).json({ message: msg, success: false });
        }

        // Compare passwords
        const isCompare = await bcrypt.compare(password, user.password);
        if (!isCompare) {
            return res.status(400).json({ message: "Invalid password", success: false });
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
            { user: user.email, _id: user._id },
            process.env.JWT_TOKEN,
            { expiresIn: "24h" }
        );

        // Success response (only one response)
        return res.status(200).json({
            message: "Login success",
            success: true,
            jwtToken,
            email,
            name: user.name,
        });

    } catch (error) {
        // Error response
        return res.status(500).json({ message: "Internal error", success: false });
    }
};

module.exports = {
    signup,
    login
};
