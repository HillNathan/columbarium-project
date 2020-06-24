// include any additional middleware declarations up here:
// i.e.
const API = require("../controller");

module.exports = app => {

    // Starting route to confirm everything is set up to run through express
    // THIS ROUTE SHOULD BE DELETED BEFORE GOING TO PRODUCTION
    app.get('/express_backend', (req, res) => {
        res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
      });

    // GET route to get all plots from the SQL database using our sequelize ORM 
    app.get('/getplots', (req,res) => {
      API.getAllPlots(theData => {
        res.send({tempDB : theData })
      })
    })

    // POST route to get info for one plot from our SQL database
    //  id should be sent in req.body as "id" and should be an integer
    app.post('/getoneplot', (req,res) => {
      API.getOnePlot(req.body.id, thePlot => {
        res.send({ data : thePlot})
      })
    })

}

