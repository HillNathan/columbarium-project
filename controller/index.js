// const neatCsv = require('neat-csv');
// const fs = require('fs');
const db = require('../models');
const { Sequelize } = require('../models');

const API = {

  //=====================================================================================================
  //  PLOT SEARCH FUNCTIONS
  //=====================================================================================================
  getAllPlots : cb => {
    // this function runs a findAll call to the SQL database and returns all records, using 
    //  the callback function passed to process the information
    //=====================================================================================================
    db.plots
    .findAll()
    .then(allPlots => {
      cb(allPlots)
    })
  },

  getOnePlot : (plotToFind, cb) => {
    // this function runs a FindOne call to the SQL database and returns a single record using
    //  the plot number of the record. the id should be passed in as an integer. Once the record is 
    //  located, the function runs the associated callback function on the record. 
    //=====================================================================================================
    db.plots
    .findOne({ 
      where : { 
        plot_number : plotToFind
      }
    })
    .then(foundPlot => {
      db.person.findAll({
        where : {
          plotId : foundPlot.plot_number
        }
      })
      .then(interred => {
        console.log(interred)
        var fullRecord = {}
        fullRecord.plot = foundPlot
        fullRecord.interred = interred
        console.log(fullRecord)
        cb(fullRecord)
      })
    })
  },

  //=====================================================================================================
  // PERSON(PEOPLE) SEARCH FUNCTIONS
  //=====================================================================================================

  searchByName : (searchTerm, cb) => {
    // this function is a temporary solution to the find by name search function, finding a specific string in the 
    //  "reserved_by" field. This may be useful in the future, so I am not deleting just yet, but this may need to 
    //  be looked at again in the future. 
    //=====================================================================================================
    db.plots.findAll({
      where : {
        reserved_by : {
          [Sequelize.Op.like] : `%${searchTerm}%` }
      }
    })
    .then(response => {
      cb(response)
    })
  },

  createNewPerson : (personInfo, cb) => {
    // this function will create a new person in the people database, using the information send over as personInfo. 
    // personInfo should be be an object and contain at least the following keys:
    //   "firstName"  - STRING
    //   "lastName"   - STRING
    //   "plotId"     - INTEGER
    // the following keys are optional but not necessary to create the record:
    //   "salutation" - STRING
    //   "middleName" - STRING
    //   "suffix"     - STRING
    // once the record is created is is sent into the callback function, passed in as cb. 
    //=====================================================================================================

    db.person.create( personInfo ) 
    .then (newPerson => {
      cb(newPerson)
    })
      
  }

}

// Export our database functions back to the routes module
module.exports = API;