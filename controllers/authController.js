const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { db } = require('../db.js');

const signToken = (id , role) => {
    return jwt.sign({id, role}, process.env.JWT_SECRET, {expireIn: process.env.JWT_EXPIRES_IN});
}

// Login function 
const login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ message: 'Please provide email and password' });
    }
    const query = `SELECT * FROM USER WHERE EMAIL = '?'`;
    db.get(query, (err, row) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: 'Database error' });
        }
        bcrypt.compare(password, row.PASSWORD, (err, isMatch) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ message: 'Error verifying password' });
            }
            
                 const token = signToken(row.ID, row.ROLE);  
        
                 return res.status(200).json({  
                    message: 'Login successful',  
                    user: {
                    id: row.ID,  
                    name: row.NAME,  
                    email: row.EMAIL,  
                    role: row.ROLE,  
                },
                token,
            });
        });
    });
};


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

    if (err) {
        console.error(err);
        return res.status(400).send('Error hasing password.');
    }
      
    //Insert 
      const query = `
      INSERT INTO USER (NAME, EMAIL, ROLE, PASSWORD)
      VALUES ('?, ?, ?, ?')`;

    db.run(query, (err) => {
        if(err) {
            if (err.message.includes('Unique constraint')){
                return res.status(400).send('Email already exisits');
            }
            console.log(err.message);
            return res.status(500).send('Databade Error.');
        }

        //Create TOKEN
        const token = signToken(this.lastID, role);
         return res.status(201).json({
            status: 'success',
            message:'Registration successful.',
            token,
         });
        });
 });
};