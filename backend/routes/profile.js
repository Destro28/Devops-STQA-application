const express = require('express');
const bcrypt = require('bcrypt');
const { readUsers, writeUsers } = require('../utils/helpers');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Get profile - Protected route
router.get('/profile', authMiddleware, (req, res) => {
    const users = readUsers();
    const user = users.find(u => u.id === req.session.userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json({
        id: user.id,
        username: user.username,
        email: user.email
    });
});

// Update profile - Protected route
router.post('/profile/update', authMiddleware, async (req, res) => {
    const { username, email, password } = req.body;
    const users = readUsers();
    const userIndex = users.findIndex(u => u.id === req.session.userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    if (username) users[userIndex].username = username;
    if (email) users[userIndex].email = email;
    if (password) {
        users[userIndex].password = await bcrypt.hash(password, 10);
    }

    writeUsers(users);

    // Update session username if changed
    if (username) req.session.username = username;

    res.json({ message: 'Profile updated successfully' });
});

// Delete account - Protected route
router.post('/profile/delete', authMiddleware, (req, res) => {
    const users = readUsers();
    const filteredUsers = users.filter(u => u.id !== req.session.userId);

    writeUsers(filteredUsers);
    req.session.destroy();

    res.json({ message: 'Account deleted successfully' });
});

module.exports = router;
