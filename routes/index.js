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
    app.get('/api/getplots', (req,res) => {
      API.getAllPlots(theData => {
        res.send({tempDB : theData })
      })
    })

    app.post("/api/adduser", (req, res) => {
      // check to make sure the username is not a duplicate
      db.user
        .findOne({ where: { username: req.body.username } })
        .then(response => {
          console.log(req.body.username);
          console.log("Response is below:");
          console.log(response);
          if (response) {
            res.json({ status: "Username already exists." });
          } else {
            db.user
              // create a new user in the users table
              .create(req.body)
              .then(() => {
                // redirect the new user to the login route
                res.json(req.body);
              })
              .catch(err => {
                // if there is an error, return the error
                res.json(err);
              });
          }
        });
    });

    // POST route to get info for one plot from our SQL database
    //  id should be sent in req.body as "id" and should be an integer
    app.post('/getoneplot', (req,res) => {
      API.getOnePlot(req.body.id, thePlot => {
        res.send({ data : thePlot})
      })
    })

    // Route for logging user out
    app.get('/logout', (req, res) => {
      // use passport to log the user out of their session
      req.logout();
      // redirect the browse to the home route with no user object
      res.redirect('/');
    })

    
  //LOGIN ROUTE - redirects to the user homepage HTML ROUTE if successful
  app.post("/login", function(req, res, next) {
    passport.authenticate("local", function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json(info);
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({ status: "success" });
      });
    })(req, res, next);
  });



}

