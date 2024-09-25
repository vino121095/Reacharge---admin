const { body } = require('express-validator');

const adminValidator = [
  body('email').isString().withMessage('email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 6 characters long'),
];

const adminLoginValidator = [
    body('email').isString().withMessage('email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 6 characters long'),
  ];

module.exports = { adminValidator, adminLoginValidator };