// include any additional middleware declarations up here:
// i.e.
const API = require("../controller");

module.exports = app => {

  //=====================================================================================================
  // PLOT ROUTES
  //=====================================================================================================
  app.get('/api/plots/getall', (req,res) => {
    API.getAllPlots(theData => {
      res.send({tempDB : theData })
    })
  })

  app.post('/api/plots/getone', (req,res) => {
    // POST route to get info for one plot from our SQL database
    //  plot number should be sent in req.body as "id" and should be an integer
    //=====================================================================================================
    API.getOnePlot(req.body.id, thePlot => {
      res.send({ data : thePlot })
    })
  })

  app.post('/api/plots/update', (req,res) => {
    // POST route to save new information about a plot into the database. plot info should be sent in req.body
    // and must include a plot number. 
    API.updateOnePlot(req.body, response => {
      if (response.length === 1) {
        API.getOnePlot(req.body.plotNumber, thePlot => {
          res.send({ data : thePlot })
        })
      }
      else res.send({ status: "fail" })
    })
  })

  //=====================================================================================================
  // Name or Person Routes
  //=====================================================================================================
  app.post('/api/searchbyname', (req,res) => {
    // POST route to search the sql databse for any reserved_by that include a string of letters, ideally a name.
    // Search term should be sent in req.body as "name" and should be a String
    //=====================================================================================================
    API.searchByName(req.body.name, response => {
      res.send({ data: response })
    })
  })

  app.post('/api/people/namesearch', (req,res) => {
    // POST route to search the SQL database for a person using their first, last, or first & last name. 
    //  we will require that all fields be sent in, but fields not being used can be left empty. Fields in 
    //  req.body must be as follows, and at least one of them must contain text:
    //      firstName = String
    //      lastName = String
    // response will be sent as an array, so even if there is only one response it will be in an array since 
    //  there COULD be multiple responses to the query. Empty objects in req.body will get an error response. 
    if (req.body.firstName === "" && req.bodyLastName === "") {
      res.send({ data: [{error: "No search terms were sent"}]})
    }
    else {
      API.personNameSearch(req.body, response => {
        res.send({ data: response })
      })
      }
  })

  app.post('/api/people/create', (req,res) => {
    // POST route to create a new person in the SQL database record in the people table, and make sure that person
    //  is associated with a plot where they are interred. Person should be in req.body and should be sent as follows:
    //    salutation - STRING (optional)
    //    firstName - STRING (required)
    //    middleName - STRING (optional)
    //    lastName - STRING (required)
    //    suffix - STRING (optional)
    //    plotID - INTEGER (required)
    //  
    // Fields listed as required must contain text, fields listed as optional must be sent but can be empty. 

    API.createNewPerson(req.body, response => {
      res.send({ data: response })
    })
  })

  //=====================================================================================================
  // USER ROUTES for db management
  //=====================================================================================================
  app.post("/api/users/add", (req, res) => {
    // POST route to create a user in the users database. information should be sent in req.body
    // and include the following information: 
    //   "username" as a string of minimum 8 characters
    //   "password" as a string of minimum 8 characters
    //   "firstName" as a string of at least 1 character
    //   "lastName" as a string of at least 1 character
    //=====================================================================================================
    db.user
      .findOne({ where: { username: req.body.username } })
      .then(response => {
        // do a quick findOne search to see if the username already exists in our users table
        // console logging for debugging purposes
        console.log(req.body.username);
        console.log("Response is below:");
        console.log(response);
        if (response) {
          // if we find a user we get a response -- so we send a response that the username already exists
          res.json({ status: "Username already exists." });
        } else {
          // if we don't find a user, then we need to create the user in our database. 
          db.user
            // create a new user in the users table
            .create(req.body)
            .then(() => {
              // send a response with the new user as a json object and allow the front-end to log the user in 
              //   and then redirect to the appropriate screen. 
              res.json(req.body);
            })
            .catch(err => {
              // if there is an error, return the error
              res.json(err);
            });
        }
      });
  });
    
  app.post("/api/users/login", function(req, res, next) {
    // LOGIN ROUTE - uses our passport middleware to determine if  our user has appropriate access
    //  this should accept the user information in an object "user" and have the following key-value pairs:
    //    "username" as a string
    //    "password" as a string
    // 
    //  if the login is successful, {status:"success"} will be sent to the front end and the app can be 
    //  redirected to the protected route, since isAuthenticated will return a true value. 
    //=====================================================================================================
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
    
  app.get('/api/users/logout', (req, res) => {
    // Route for logging user out
    //=====================================================================================================
    // use passport to log the user out of their session
    req.logout();
    // redirect the browse to the home route with no user object
    res.redirect('/');
  })

}

