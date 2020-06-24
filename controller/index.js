const neatCsv = require('neat-csv');
const fs = require('fs');
const db = require('../models');

const API = {

  getAllPlots : cb => {
    // this function runs a findAll call to the SQL database and returns all records, using 
    //  the callback function passed to process the information
    db.plots
    .findAll()
    .then(allPlots => {
      cb(allPlots)
    })
  },

  getOnePlot : (idToFind, cb) => {
    // this function runs a FindOne call to the SQL database and returns a single record using
    //  the id of the record. the id should be passed in as an integer. Once the record is 
    //  located, the function runs the associated callback function on the record. 
    db.plots
    .findOne({ where : 
      { id : idToFind} })
    .then(foundPlot => {
      cb( foundPlot )
    })
  }

}

// Export our database functions back to the routes module
module.exports = API;