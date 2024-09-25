const { body, validationResult  } = require('express-validator');

validateOperator = [
    body('operator')
        .notEmpty().withMessage('Operator field is required')
        .isString().withMessage('Operator must be a string'),
    
    body('role')
        .optional()
        .isString().withMessage('Role must be a string'),

    // Handle errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateOperator };