const neatCsv = require('neat-csv');
const fs = require('fs');
const db = require('../models');

const massage = async theArray => {
  var tempArray = []
  var arrayRow = []
  theArray.map(item => {
      arrayRow.push(item)
      if (item.ID % 22 === 0) {
          tempArray.push(arrayRow.reverse())
          arrayRow = []
      }
  })
  return tempArray;
}

const API = {

  getData : (cb) => {

    fs.readFile('controller/columbarium-data.csv', async (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      var temp = await neatCsv(data)
      cb( temp )
    })

  },

  getAllPlots : cb => {
    db.plots
    .findAll()
    .then(allPlots => {
      cb(allPlots)
    })
  }

}

module.exports = API;