const Operator = require('../models/operator');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create an Operator
const createOperator = async (req, res) => {
    try {
        const { operator, role } = req.body;
        const newOperator = new Operator({ operator, role });
        await newOperator.save();
        res.status(201).json({ message: 'Operator created successfully', operator: newOperator });
    } catch (error) {
        res.status(500).json({ message: 'Error creating operator', error });
    }
};

// Get all Operators
const getOperators = async (req, res) => {
    try {
        const operators = await Operator.find();
        res.status(200).json(operators);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching operators', error });
    }
};

// Get a single Operator by ID
const getOperatorById = async (req, res) => {
    try {
        const operator = await Operator.findById(req.params.id);
        if (!operator) {
            return res.status(404).json({ message: 'Operator not found' });
        }
        res.status(200).json(operator);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching operator', error });
    }
};

// Update an Operator by ID
const updateOperator = async (req, res) => {
    try {
        const updatedOperator = await Operator.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedOperator) {
            return res.status(404).json({ message: 'Operator not found' });
        }
        res.status(200).json(updatedOperator);
    } catch (error) {
        res.status(500).json({ message: 'Error updating operator', error });
    }
};

// Delete an Operator by ID
const deleteOperator = async (req, res) => {
    try {
        const operator = await Operator.findByIdAndDelete(req.params.id);
        if (!operator) {
            return res.status(404).json({ message: 'Operator not found' });
        }
        res.status(200).json({ message: 'Operator deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting operator', error });
    }
};

module.exports = {
    createOperator,
    getOperators,
    getOperatorById,
    updateOperator,
    deleteOperator
}
