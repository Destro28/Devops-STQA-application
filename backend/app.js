const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: 'your-secret-key-12345',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 } // 1 hour
}));

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Import routes (will create these next)
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

// Use routes
app.use('/api', authRoutes);
app.use('/api', profileRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
