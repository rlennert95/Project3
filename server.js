const express = require("express");
var session = require("express-session");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

// Requiring passport as we've configured it
var passport = require("./config/passport");


// middleware for parsing body on post request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// DB stuff
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mernp-saturday-live");
const db = require("./models");

// Setup passport
app.use(session({ secret: "saturdaylive", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Login post route

// TODO: REMOVE OLD LOGIN ROUTE
app.post("/login", passport.authenticate("local"), function(req, res) {
  // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
  // So we're sending the user back the route to the members page because the redirect will happen on the front end
  // They won't get this or even be able to access this page if they aren't authed
  // res.json("/members");
  res.json({loggedIn: true,
            message: "WOOOO IT WORKED",
            username: req.user.username });
});

// Route to get user info

// Route for getting some data about our user to be used client side
app.get("/user_data", function(req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({ loggedIn: false});
  }
  else {
    // Otherwise send back the user's username and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      username: req.user.username,
      loggedIn: true
    });
  }
});

// All users test route
app.get("/allusers", function(req, res) {
  console.log("All users route was hit!");
  // get all users and send them back in a json blob
  db.User
    .find({})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
})

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
