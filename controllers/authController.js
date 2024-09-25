const User = require('../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    console.log('Request Body:', req.body);

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation Errors:', errors.array());
            return res.status(400).json({
                success: false,
                msg: 'Validation errors',
                errors: errors.array()
            });
        }

        const { name, email, phone, password, confirm_password, } = req.body;

        // Check if passwords match
        if (password !== confirm_password) {
            return res.status(400).json({
                success: false,
                msg: 'Passwords do not match!'
            });
        }

        const isExistUser = await User.findOne({ email });
        if (isExistUser) {
            return res.status(400).json({
                success: false,
                msg: 'Email already exists!'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user without confirm_password
        const user = new User({
            name,
            email,
            phone,
            password: hashedPassword
        });

        const userData = await user.save();

        const userWithoutPassword = {
            name: userData.name,
            email: userData.email,
            phone:userData.phone,
            _id: userData._id,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
        };

        return res.status(201).json({
            success: true,
            msg: 'Registered Successfully!',
            data: userWithoutPassword
        });
    } catch (error) {
        console.error('Error during registration:', error.message);
        return res.status(500).json({
            success: false,
            msg: 'An internal server error occurred',
            error: error.message
        });
    }
}


const generateAccessToken = async (user) => {
    const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "2h" });
    return token;
}

const loginUser = async (req, res) => {
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
    registerUser,
    loginUser
}
