const mongoose = require('mongoose');

const adminUserSchema  = new mongoose.Schema({
   email:{
    type: String,
    required: true
   },
   password:{
    type: String,
    required: true
   },
   role:{
    type: String,
    default: 0
   },
});

const adminUser = mongoose.model('adminUser', adminUserSchema);
module.exports = adminUser;