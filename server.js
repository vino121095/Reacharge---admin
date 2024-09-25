// index.js
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const URI = "mongodb+srv://vinothini1deecodes:9MSQoIZJ4d0k1zD0@reacharge.mihcq.mongodb.net/?retryWrites=true&w=majority&appName=reacharge";

mongoose.connect(URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the RBAC Node.js App');
});

app.post('/', (req, res) => {
  res.send('post Request submited');
});

//Admin Route
const adminRoutes = require ('./routes/adminRoutes');
app.use('/api', adminRoutes);

//User Route
const authRoutes = require ('./routes/authRoutes');
app.use('/api', authRoutes);

//Operator Route
const operatorRoutes = require ('./routes/operatorRoutes');
app.use('/api', operatorRoutes)


app.listen(8000, () => {
  console.log('Server running on port 8000');
});
