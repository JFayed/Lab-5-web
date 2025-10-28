const {trips} = require('../Models/TripModel');
const {db} = require('../db.js')

const retrieveAllTrips = (req,res) => {
    const allTrips = trips;
    res.status(200).json({
        status: "success",
        message: 'Trips retrived successfullyl',
        results: allTrips.length,
        data:allTrips,
    });
};



// create new trip 
const createNewTrip = (req,res) =>
{
    const {
        destinationName, location, continent, language, description,
        flightCost = 0, accommodationCost = 0, mealCost = 0, 
        visaCost = 0, transportationCost = 0, currencyCode = 'N/A'
    } = req.body;

    if (destinationName || location || continent || language || description){
        return res.status(400).json({
            message:
            'Messgae required feilds: destinationName, location, continent, language, and description are mandatory.'
        });
    }

const query = `
INSERT INTO TRIP (DESTINATIONNAME, LOCATION, CONTINENT, LANGUAGE, 
    DESCRIPTION, FLIGHTCOST, ACCOMMODATIONCOST, MEALCOST, VISACOST, TRANSPORTATIONCOST, CURRENCYCODE )  
VALUES ('${destinationName}', '${location}', '${continent}', '${language}', 
    '${description}', ${flightCost}, ${accommodationCost}, ${mealCost}, 
    ${visacost}, ${transportationCost}, '${currencyCode}')
    `;
    db.run(query, (err) => {
        if (err) {
            console.log (error);
            return res.status(500).json({
                message: 'Database error',
                error: err.message
            });
        }
        return res.status(201).json({
            message: 'Trip created successfully'
        });
    });

};

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

module.exports = {retrieveAllTrips,createNewTrip};
