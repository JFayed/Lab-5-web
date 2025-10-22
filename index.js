const express = require('express');
const TripRouter=require('./Routes/TripRoutes.js');//

const app = express();

app.use(express.json());
//app.use('/api/v1/trips', TripRouter);
// app,use(`/api/v1/trips`, TripRouter);
// if the request starts with /api/v1/trips,
// it will be handeled by TripRouter

app.use('/trips', TripRouter);

module.exports =
{
    app
};