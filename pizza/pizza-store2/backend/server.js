const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();
console.log('JWT_SECRET:', process.env.JWT_SECRET); // Log JWT_SECRET

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3002",
    methods: ["POST", "GET"],
    allowedHeaders: 'Content-Type, Authorization'
}));

// Route imports
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const billRoutes = require('./routes/billRoutes');
const messageRoutes = require('./routes/messageRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/messages', messageRoutes);

// MongoDB connection
mongoose.connect('mongodb+srv://test1:test@cluster0.bcrkjdi.mongodb.net/database?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected...');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(err.statusCode || 500).json({
        message: err.message || 'Server error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});
