const jwt = require("jsonwebtoken");

const ensuringAuthorization = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) { 
        return res.status(403).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(403).json({ message: "JWT token is missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN); // Verify the token
        req.user = decoded; // Store decoded token in request object
        next(); // Proceed to the next middleware or route
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired JWT token" });
    }
};

module.exports = ensuringAuthorization;
