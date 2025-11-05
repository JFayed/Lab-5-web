const express = require('express');
const {
    createUser, 
    retrieveAllUsers, 
    retrieveUserById, 
    updateUserById, 
    deleteUserById 
} = require('../controllers/userController.js');

const {verifyAdmin} = require('../controllers/authController.js'); //import it


const userRouter = express.Router();

// Apply verifyAdmin to all routes in this router 
userRouter.use(verifyAdmin)

// All users
userRouter
    .route('/')
    .get(retrieveAllUsers)  // Get all Users
    .post(createUser);     // Add a new user

// Single user by ID
userRouter
    .route('/:id')
    .get(retrieveUserById)  // Get single user by ID
    .put(updateUserById)   // Update user by ID
    .delete(deleteUserById);   // Delete user by ID

    module.exports = userRouter;