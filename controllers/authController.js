const bcrypt = require('bcryptjs');
const { db } = require('../db.js');

//POST /signup
const signUp = (req, res) => {  
    const name = req.body.name;  
    const email = req.body.email;  
    const password = req.body.password;  
    const role = 'user'; // default to non-admin  

    if (!name || !email || !password) {
    return res.status(400).send('Please provide name, email, and password');
}
 bcrypt.hash(password, 10, (err, hashedPassowrd) => {
    
    const query = `
    INSERT INTO USER (NAME, EMAIL, ROLE, PASSWORD)
    VALUES ('${name}', '${email}', '${role}', '${password}')
    `;

    db.run(query, (err) => {
        if(err) {
            console.log(err.message);
            if (err.message.includes('Unique constraint')){
                return res.status(400).send('Email already exisits');
            }
            return res.status(500).send('Databade Error.');
        }

        return res.status(200).send('Registration successful.');
    });
    } )
};
bcrypt.compare(plainPassword, hashedPassword, (err, isMatch) => {
    if (isMatch) {
    // Correct password!
    } else {
    // Invalid credentials
    }
});

// Login function 
const bcrypt = require('bcrypt');
const login = (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

}
    // First, find user by email in database
    const findUserQuery = `SELECT * FROM USER WHERE EMAIL = '${email}'`;
    
    db.get(findUserQuery, async (err, user) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Database error' });
        }
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare provided password with stored hash
        bcrypt.compare(password, user.PASSWORD, (err, isMatch) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Error verifying password' });
            }
            
            if (isMatch) {
                 // Correct password - login successful
                return res.status(200).json({ 
                    message: 'Login successful',
                    user: {
                        id: user.ID,
                        name: user.NAME,
                        email: user.EMAIL,
                        role: user.ROLE
                    }
                });
            } else {
                // Invalid password
                return res.status(401).json({ message: 'Invalid credentials' });
            }
        });
    });