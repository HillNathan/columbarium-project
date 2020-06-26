const axios = require('axios')

const API = {

    getOnePlot: plotID => {
        return axios.post('/api/getoneplot', 
        { id : plotID } )
    },

    getAllPlots: () => {
        return axios.get('/api/getplots')
    }

}

module.exports = API