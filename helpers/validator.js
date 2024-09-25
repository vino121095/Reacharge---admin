const { body } = require('express-validator');

// Define your validators
const registerValidator = [
  body('name').isString().withMessage('Name is required'),
  body('email').isString().withMessage('Email is required'),
  body('phone')
    .isString()
    .withMessage('Phone number is required')
    .isLength({ min: 10, max: 15 }) // Adjust the length as needed
    .withMessage('Phone number must be between 10 and 15 characters long'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('confirm_password')
    .isLength({ min: 8 }).withMessage('Confirm password must be at least 8 characters long')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
];

const loginValidator = [
  body('email').isString().withMessage('Email is required'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  // Optionally, you can add phone validation here if needed
  // body('phone').optional().isString().withMessage('Phone number must be a string'),
];

module.exports = { registerValidator, loginValidator };
