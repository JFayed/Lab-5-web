const express = require('express');
const cors = requrie('cors');
const dotenv = require('dotenv');
const authRouter=require('./Routes/authRoutes.js');
const tripRouter=require('./Routes/TripRoutes.js');
const userRouter=require('./Routes/userRoutes.js');//
;

// load envinroment variables from .env file
dotenv.config();

//server.use(cors());
// Create abd instance of the Express application
const app = express();

// Use middleware to parse JSON data from request bodies 
app.use(express.json());

app.use('/trips', tripRouter);
app.use('/users', userRouter);
app.use('/trips', authRouter);

module.exports = {
    app,
};