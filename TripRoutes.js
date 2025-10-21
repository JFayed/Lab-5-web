const express = require(`express`);
const{
    retrieveAllTrips
}=require(`../controllers/tripControlles.js`);

const tripRouter = express.Router();

// All trips 
tripRouter
.router(`/`)
.get(retrieveAllTrips);

module.exports = tripRouter;