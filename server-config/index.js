// require("dotenv").config();

// SET EXPRESS ENVIRONMENT
const express = require("express");
const app = express();

// Set variables for our express environment
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// check to see if we are using the production version of the app
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }

// include all of our routes from the routes module to our express environment
require('../routes')(app);

// export our express environment back to the server
module.exports = app;