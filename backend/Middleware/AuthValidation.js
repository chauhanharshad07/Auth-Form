const Joi = require("joi");

// Signup validation
const signupValidation = (req, res, next) => {
    const UserSchema = Joi.object({
        name: Joi.string().min(4).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
    });

    const { error } = UserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error: error.details[0].message });
    }
    next();
};

// Login validation
const loginValidation = (req, res, next) => {
    const UserSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
    });

    const { error } = UserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error: error.details[0].message });
    }
    next();
};

module.exports = {
    signupValidation,
    loginValidation,
};
