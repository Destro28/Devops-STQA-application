const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

// Read users from JSON file
const readUsers = () => {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
};

// Write users to JSON file
const writeUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

module.exports = { readUsers, writeUsers };
