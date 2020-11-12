// initialize some required modules and criteria
const express = require("express");
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const mainController = require("./controller/mainController");
const dashboardController = require("./controller/dashboardController");
const courseController = require("./controller/courseController");
const trainerController = require("./controller/trainerController");
const utils = require("./controller/utils");
const bodyParser = require("body-parser");
const initializePassport = require('./passport-config');
require("dotenv").config();

// initialize the middleware of the app
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(__dirname + '/react/build'));
app.use(bodyParser.json());
app.use(flash());
app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// initialize passport configuration
initializePassport(passport, username => {
    // get user from database with their username
});

// initialize the routers of the app
mainController(app, passport);
dashboardController(app);
courseController(app, utils);
trainerController(app, utils);

// create a way for the express to serve react home page
app.get('/', (req, res) => {
  console.log("sending react homepage");
  res.sendFile(__dirname +'/react/build/index.html');
});

//listen to a specific port.
app.listen(process.env.PORT || 5000, () => {
  console.log(`Start listening for the port ${process.env.PORT}` );
});
