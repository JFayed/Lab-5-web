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