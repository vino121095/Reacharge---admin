const mongoose = require('mongoose');

const operatorSchema  = new mongoose.Schema({
   operator:{
    type: String,
    required: true
   },
   role:{
    type: String,
    default: 0
   },
});

const operator = mongoose.model('operator', operatorSchema);
module.exports = operator;