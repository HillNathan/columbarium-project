const neatCsv = require('neat-csv');
const fs = require('fs')

var myDB = []

fs.readFile('./columbarium-data.csv', async (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(myDB)
  myDB = await neatCsv(data)
})

export default myDB;