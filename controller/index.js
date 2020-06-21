const neatCsv = require('neat-csv');
const fs = require('fs')

const massage = theArray => {
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
    var myDB = []

    fs.readFile('controller/columbarium-data.csv', async (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      var temp = await neatCsv(data)
      myDB = massage(temp)
      cb( myDB );
    })

  }

}

module.exports = API;