const {
    trips,getTripWithDailycost
} = require('../Models/TripModel');

const retrieveAllTrips = (req,res) => {
    const allTrips = trips;
    res.status(200),json({
        status: "success",
        message: 'Trips retrived successfullyl',
        results: allTrips.length,
        data:allTrips,
    });
};



// create new trip 
const createNewTrip = (req,res) =>
{
    const{destinationName,
        location,
        continent,
        language,
        description,
        flightCost,
        accommodationCost,
        mealCost,
        visaCost,
        trasnportationCost,
        currencyCode} = req.body;

const newTrip = {
        id: trips.length + 1,
        destinationName,
        location,
        continent,
        language,
        description,
        flightCost,
        accommodationCost,
        mealCost,
        visaCost,
        trasnportationCost,
        currencyCode,
    }
trips.push(newTrip);

}

const deleteTripById=(req,res) =>
{
    const id = Number(req,paramas,id);
    const index=trips.findIndex(t=>t.id==id);
    trips.slice(index,1);
   

}
const UpdateById=(req,res)=>
{
    const id = Number(req,paramas,id);
    const index=trips.findIndex(t=>t.id==id);   
    Object.assign(trip,req,body);
}
module.exports
{retrieveAllTrips,createNewTrip, deleteTripById,UpdateById};
