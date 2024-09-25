const express = require('express');
const router = express.Router();

const operatorController = require('../controllers/operatorController');
const operatorValidator = require('../helpers/operatorValidator');

// Create an Operator
router.post('/operators', validateOperator, operatorController.createOperator);

// Get all Operators
router.get('/operators', operatorController.getOperators);

// Get a single Operator by ID
router.get('/operators/:id', operatorController.getOperatorById);

// Update an Operator by ID
router.put('/operators/:id', validateOperator, operatorController.updateOperator);

// Delete an Operator by ID
router.delete('/operators/:id', operatorController.deleteOperator);

module.exports = router;