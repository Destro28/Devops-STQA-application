// Load profile data on page load
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/profile');
        
        if (!response.ok) {
            window.location.href = 'login.html';
            return;
        }

        const user = await response.json();
        document.getElementById('displayUsername').textContent = user.username;
        document.getElementById('displayEmail').textContent = user.email;
    } catch (error) {
        window.location.href = 'login.html';
    }
});

// Update profile
document.getElementById('updateForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = password;

    if (Object.keys(updateData).length === 0) {
        document.getElementById('message').textContent = 'Please enter at least one field to update';
        return;
    }

    const response = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
    });

    const data = await response.json();
    document.getElementById('message').textContent = data.message;
    document.getElementById('message').style.color = response.ok ? 'green' : 'red';

    if (response.ok) {
        setTimeout(() => location.reload(), 1500);
    }
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', async () => {
    await fetch('/api/logout');
    window.location.href = 'login.html';
});

// Delete account
document.getElementById('deleteBtn').addEventListener('click', async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        return;
    }

    const response = await fetch('/api/profile/delete', {
        method: 'POST'
    });

    const data = await response.json();
    alert(data.message);

    if (response.ok) {
        window.location.href = 'register.html';
    }
});
