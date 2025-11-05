const express = require('express');
const { signUP, login , updatePassowrd } = require ('../controllers/authController');

const authRouter = express.Router();

// POST /api/v1/auth/signup
authRouter.post('/signup', signUp);

// POST /api/v1/auth/login
authRouter.post('/login', login);

// PUT /api/v1/auth/updatePassword
authRouter.put('/updatePassword', updatePassword);

module.exports = authRouter;