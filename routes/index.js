// include any additional middleware declarations up here:
// i.e.
const API = require("../controller");

module.exports = app => {

    // Starting route to confirm everything is set up to run through express
    app.get('/express_backend', (req, res) => {
        res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
      });

    app.get('/get_temp_db', (req,res) => {
        API.getData(theData => {
          res.send({tempDB : theData})
        })
    })

    app.get('/getplots', (req,res) => {
      API.getAllPlots(theData => {
        res.send({tempDB : theData })
      })
    })

    app.post('/getoneplot', (req,res) => {
      API.getOnePlot(req.body.id, thePlot => {
        res.send({ data : thePlot})
      })
    })

}

