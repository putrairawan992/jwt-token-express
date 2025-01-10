// src/app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const db = require('./config/db.config.js');
const redisClient = require('./config/redis.config.js');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Health Check
app.get('/health', async (req, res) => {
    try {
        await db.query('SELECT 1');
        await redisClient.ping();
        res.status(200).json({ status: 'Healthy' });
    } catch (error) {
        res.status(500).json({ status: 'Unhealthy', error: error.message });
    }
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
