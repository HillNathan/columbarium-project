const axios = require('axios')

const API = {

    getOnePlot: plotID => axios.post('/api/plots/getone', { id : plotID } ),

    getAllPlots: () => axios.get('/api/plots/getall'),

    updateOnePlot: plotInfo => axios.post('/api/plots/update', plotInfo),

    doNameSearch: nameQuery => axios.post('/api/people/namesearch', nameQuery),

}

module.exports = API