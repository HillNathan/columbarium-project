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
        plotNumber : plotToFind
      }
    })
    .then(foundPlot => {
      db.person.findAll({
        where : {
          plotId : foundPlot.plotNumber
        }
      })
      .then(interred => {
        var fullRecord = {}
        fullRecord.plot = foundPlot
        fullRecord.interred = interred
        cb(fullRecord)
      })
    })
  },

  updateOnePlot : (plotInfo, cb) => {
    db.plots.update(plotInfo, {
      where: { plotNumber : plotInfo.plotNumber }
    })
    .then(rowsUpdated => {
      // returns a number of rows that were updated, not the actual record. 
      cb(rowsUpdated)
    })
  },

  //=====================================================================================================
  // PERSON(PEOPLE) FUNCTIONS
  //=====================================================================================================

  updateOnePerson : (personInfo, cb) => {
    // This function will take in a person as an object, then update the person using the id to odentify the
    //   record to be updated. Error checking for an id key is done at the route level.  
    //=====================================================================================================
    db.person.update(personInfo, {
      where: { id : personInfo.id }
    })
    .then(rowsUpdated => {
      // returns a number of rows that were updated, not the actual record. 
      cb(rowsUpdated)
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
      
  },

  personNameSearch : (searchTerms, cb) => {
    // this function will run the db query to search by either firstName, lastName, or both. 
    //   namesToLookFor should be an object and contain the following keys: 
    //       "firstName" - STRING
    //        "lastname" - STRING
    // after error-checking in the route, either one or both of these fields will have a value in them
    // but it is possible that one is empty. 
    //=====================================================================================================

    if (searchTerms.firstName === "") {
      db.person.findAll({
        where: { 
          lastName : searchTerms.lastName
        }
      })
      .then(results => {
        cb(results)
      })
    }
    else if (searchTerms.lastName === "") {
      db.person.findAll({
        where: { 
          firstName : searchTerms.firstName
        }
      })
      .then(results => {
        cb(results)
      })
    }
    else {
      db.person.findAll({
        where: { 
          lastName : searchTerms.lastName,
          firstName : searchTerms.firstName
        }
      })
      .then(results => {
        cb(results)
      })

    }
  }
}

// Export our database functions back to the routes module
module.exports = API;