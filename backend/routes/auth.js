const express = require('express');
const bcrypt = require('bcrypt');
const { readUsers, writeUsers } = require('../utils/helpers');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const users = readUsers();

    // Check if user already exists
    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password: hashedPassword
    };

    users.push(newUser);
    writeUsers(users);

    res.status(201).json({ message: 'User registered successfully' });
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const users = readUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create session
    req.session.userId = user.id;
    req.session.username = user.username;

    res.json({ message: 'Login successful', username: user.username });
});

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logged out successfully' });
});

module.exports = router;
