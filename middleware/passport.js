var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

passport.use(
    new LocalStrategy(function(username, password, done) {
      // When a user tries to sign in this code runs
      console.log("====PASSPORT HIT====")
      db.user
        .findOne({
          where: {
            username: username
          }
        })
        .then(function(dbUser) {
          // If there's no user with the given username
          if (!dbUser) {
            return done(null, false, {
              message: "Incorrect username."
            });
          }
          // If there is a user with the given email, but the password the user gives us is incorrect
          else if (!dbUser.validPassword(password)) {
            return done(null, false, {
              message: "Incorrect password."
            });
          }
          console.log("=====USER FOUND====")
          // If none of the above, return the user
          return done(null, dbUser);
        });
    })
  );

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
  
  // Exporting our configured passport
  module.exports = passport;