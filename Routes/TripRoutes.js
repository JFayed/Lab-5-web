const express = require('express');
const{
    retrieveAllTrips,
    createTrip,
    deleteTripById,
    UpdateById
}=require('../controllers/TripController.js');

const tripRouter = express.Router();

tripRouter
.route('/')
.post(createTrip)
.get(retrieveAllTrips);

// All trips 
tripRouter
.route('/:id')
.put(UpdateById)
.delete(deleteTripById);


module.exports = {tripRouter};