const axios = require('axios')

const API = {

    getOnePlot: plotID => {
        return axios.post('/api/plots/getone', 
        { id : plotID } )
    },

    getAllPlots: () => {
        return axios.get('/api/plots/getall')
    },

}

module.exports = API