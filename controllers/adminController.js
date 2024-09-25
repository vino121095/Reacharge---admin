const User = require('../models/adminUser');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const admin = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Validation errors',
                errors: errors.array(),
            });
        }

        const { email, password } = req.body;
        const isExistUser = await User.findOne({ email });
        if (isExistUser) {
            return res.status(400).json({
                success: false,
                msg: 'Email already exists!',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
        });

        const userData = await newUser.save();

        const userWithoutPassword = {
            email: userData.email,
            _id: userData._id,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
        };

        return res.status(200).json({
            success: true,
            msg: 'Registered Successfully!',
            data: userWithoutPassword,
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'An error occurred',
            error: error.message,
        });
    }
};

const generateAccessToken = async (newUser) => {
    const token = jwt.sign(newUser, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "2h" });
    return token;
}

const adminLogin = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { email, password } = req.body;
        const userData = await User.findOne({ email });

        if (!userData) {
            return res.status(400).json({
                success: false,
                msg: 'Email & Password are incorrect!',
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, userData.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                msg: 'Email & Password are incorrect!'
            });
        }

        const accessToken = await generateAccessToken({ user: userData });
        return res.status(200).json({
            success: true,
            msg: 'Login Successfully!',
            accessToken: accessToken,
            tokenType: 'Bearer',
            data: userData
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
}

module.exports = {
    admin,
    adminLogin
};
