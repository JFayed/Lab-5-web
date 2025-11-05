const bcrypt = require('bcryptjs');
const { db } = require('../db.js');

// Create new user
const createUser = (req, res) => {
    const {
        name, email, password, role = 'user'
    } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: 'Required fields: name, email, and password are mandatory.'
        });
    }

    // Hash password before storing
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Error hashing password',
                error: err.message
            });
        }

        const query = `
            INSERT INTO USER (NAME, EMAIL, ROLE, PASSWORD)  
            VALUES ('${name}', '${email}', '${role}', '${hashedPassword}')
        `;
        
        db.run(query, function(err) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Database error',
                    error: err.message
                });
            }
            return res.status(201).json({
                message: 'User created successfully',
                data: { id: this.lastID }
            });
        });
    });
};

// Retrieve all users
const retrieveAllUsers = (req, res) => {
    const query = `SELECT ID, NAME, EMAIL, ROLE FROM USER`;

    db.all(query, (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Error retrieving users' });
        }
        return res.status(200).json({
            message: 'Users retrieved successfully', 
            data: rows
        });
    });
};

// Retrieve a single user by ID
const retrieveUserById = (req, res) => {
    const id = req.params.id;
    const query = `SELECT ID, NAME, EMAIL, ROLE FROM USER WHERE ID = ${id}`;

    db.get(query, (err, row) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Error fetching user' });
        }
        if (!row) return res.status(404).json({ message: 'User not found' });

        return res.status(200).json({ 
            message: 'User retrieved successfully', 
            data: row 
        });
    });
};

// Update user by ID
const updateUserById = (req, res) => {
    const id = req.params.id;
    const { name, email, role } = req.body;

    if (!name && !email && !role) {
        return res.status(400).json({
            message: 'At least one field (name, email, or role) must be provided for update.'
        });
    }

    let updateFields = [];
    if (name) updateFields.push(`NAME = '${name}'`);
    if (email) updateFields.push(`EMAIL = '${email}'`);
    if (role) updateFields.push(`ROLE = '${role}'`);

    const query = `
        UPDATE USER 
        SET ${updateFields.join(', ')} 
        WHERE ID = ${id}
    `;

    db.run(query, function(err) {
        if (err) {
            console.log(err);
            return res.status(500).json({ 
                message: 'Error updating user',
                error: err.message 
            });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ 
            message: 'User updated successfully' 
        });
    });
};

// Delete user by ID
const deleteUserById = (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM USER WHERE ID = ${id}`;

    db.run(query, function(err) {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Error deleting user' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    });
};

module.exports = { 
    createUser, 
    retrieveAllUsers, 
    retrieveUserById, 
    updateUserById, 
    deleteUserById 
};