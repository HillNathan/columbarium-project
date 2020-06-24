// Leaving this file in here, even though it is not used in the program at all, but was a 
//  test file to make sure I could read the csv file and then fiddle with the array the csv
//  read function created to make it into an array containing 38 arrays of 22 items each so
//  when I went to display the information as a plot map the information displayed correctly
// This ended up not being in the server-side code, but is handled in the App.js file on the 
//  client side. 

const neatCsv = require('neat-csv');
const fs = require('fs')

const massage = theArray => {
    // create two empty arrays. One will hold the array of arrays that will eventually make up 
    //  our map, the other will be a temporary container to hold the plots as they are put into
    //  the arrays to make up each row. 
    var tempArray = []
    var arrayRow = []
    theArray.map(item => {
        // add the item to the row array
        arrayRow.push(item)
        // if we are at 22 items in that array, then add it to our array of arrays and clear it out
        //  to start the next one. 
        if (item.ID % 22 === 0) {
            tempArray.push(arrayRow)
            arrayRow = []
        }
    })
    // return our completed array of arrays
    return tempArray;
}

var myDB = []


fs.readFile('controller/columbarium-data.csv', async (err, data) => {
    if (err) {
    console.error(err)
    return
    }
    // if no errors reading the file using the neat-csv package, we get our data into a variable once it is complete
    var temp = await neatCsv(data)
    myDB = massage(temp)
    console.log(myDB)
})