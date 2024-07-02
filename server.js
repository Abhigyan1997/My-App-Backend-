require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const userRoutes = require('./routes/user');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 1000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', userRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
