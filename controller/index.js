const neatCsv = require('neat-csv');
const fs = require('fs')

const API = {

  getData : (cb) => {
    var myDB = []

    fs.readFile('controller/columbarium-data.csv', async (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      myDB = await neatCsv(data)
      cb( myDB );
    })

  }

}

module.exports = API;