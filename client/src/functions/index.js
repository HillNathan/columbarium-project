const axios = require('axios')

//======================================================================================
// 
// This block of functions is so that we can put all of our back-end fetching with axios
//  into one place. This clears up some of the code in the App.js side as to what exactly
//  those functions are doing, and allows us to compartmentalize our fetching to this 
//  one module.
//
//======================================================================================
const API = {

    // fetch a songle plot from the plots DB
    getOnePlot: plotID => axios.post('/api/plots/getone', { id : plotID } ),

    // fetch our full plot list from the plots DB
    getAllPlots: () => axios.get('/api/plots/getall'),

    // send new information for one plot to be updated in the plots DB
    updateOnePlot: plotInfo => axios.post('/api/plots/update', plotInfo),

    // search for a person's name in the people DB, nameQuery is an object with both 
    //  firstName and lastName
    doNameSearch: nameQuery => axios.post('/api/people/namesearch', nameQuery),

    // create a new person in the people DB 
    addPerson: personObj => axios.post('/api/people/create', personObj),

    // send new information for one person to be updated in the people DB
    updateOnePerson: thePerson => axios.post('/api/people/update', thePerson),

    // route to upload a picture file to be associated with a database. thePictureData should be a 
    //  multi-type form and include a picture as well as the id of the plot it is to be associated with
    pictureFileUpload: thePictureData => axios.post('/api/plots/picture/upload', thePictureData),

}

module.exports = API