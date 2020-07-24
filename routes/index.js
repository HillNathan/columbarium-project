// include any additional middleware declarations up here:
// i.e.
const middleware = require("../middleware")
const passport = middleware.passport
const formidable = require('formidable')
const API = require("../controller")

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

  app.post('/api/plots/picture/upload', (req,res) => {
    // POST route to take in a picture, save it to the server in our public folder so it is accessible by the 
    //   front-end, and add the picture information to the plot record so that when the plot is pulled up, 
    //   the picture can be displayed. 
    // Receives multipart form data with a picture file and a "plot" field giving the plot number for the 
    //   database association. 
    var myObj = {}

    var form = new formidable.IncomingForm()
    form.uploadDir = __dirname + '/../client/public/images/';
    console.log("--FORM START--");
    form.on('field', (name, field) => {
      myObj[name] = field
    })
    form.on('fileBegin', (name, file) => {  
      file.path = form.uploadDir + file.name;
    })
    .on('error', (err) => {
      console.error('Error', err)
      res.send("Error")
      throw err
    })
    .on('end', () => {
      console.log(myObj)
      API.updateOnePlot(myObj, response => {
        console.log(response)
      })
      res.send("File uploaded Successfully")
    })
    form.parse(req)

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
    //    dateOfBirth - DATE (optional)
    //    dateOfDeath - DATE (optional)
    //    plotID - INTEGER (required)
    //  
    // Fields listed as required must contain text, fields listed as optional must be sent but can be empty. 
    API.createNewPerson(req.body, response => {
      res.send({ data: response })
    })
  })

  app.post('/api/people/update', (req,res) => {
    // POST route to update one person in the SQL database in the person table. Person should be in req.body and 
    //  contain at minimum the id for the person being updated as an integer. 
    if (!req.body.id) {
      res.send({ data: [{error: "No person id was sent"}]})
    }
    else {
      API.updateOnePerson(req.body, response => {
        res.send({ data : response })
      })  
    }
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
    API.addUser(req.body, response => {
      res.send(response)
    })
  })
    
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
        return res.json(info)
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err)
        }
        return res.status(200).json({ status: "success" })
      })
    })(req, res, next)
  })

  app.get('/api/users/checkuser', (req,res) => {
    if (!req.user) return res.json({ result: "no user" })
    else {
      API.findUser(req.user, userObj => {
        console.log(userObj)
        res.json({
          username: userObj.username,
          firstName: userObj.firstName,
          lastName: userObj.lastName
        })
      })
    }
  })
    
  app.get('/api/users/logout', (req, res) => {
    // Route for logging user out
    //=====================================================================================================
    // use passport to log the user out of their session
    req.logout()
    // redirect the browse to the home route with no user object
    res.redirect('/')
  })

}

