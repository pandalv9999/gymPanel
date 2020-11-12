// initialize some required modules and criteria
const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const mainController = require("./controller/mainController");
const dashboardController = require("./controller/dashboardController");
const courseController = require("./controller/courseController");
const trainerController = require("./controller/trainerController");
const utils = require("./controller/utils");
const bodyParser = require("body-parser");
const initializePassport = require("./passport-config");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const url =
  "mongodb+srv://" +
  process.env.username +
  ":" +
  process.env.password +
  "@testdb.qzr4t.mongodb.net/" +
  process.env.database +
  "?retryWrites=true&w=majority";
// The second argument in MongoClient is an object for not getting the deprecation warnings from MongoDB
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// initialize the middleware of the app
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(__dirname + "/react/build"));
app.use(bodyParser.json());
app.use(flash());
app.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// initialize passport configuration
initializePassport(passport, async (username) => {
  // get user from database with their username
  console.log(`Authenticating user ${username}`);
  await client.connect();
  return await client
    .db(process.env.database)
    .collection("users")
    .findOne({ username: username });
});

// initialize the routers of the app
mainController(app, passport, utils);
dashboardController(app, utils);
courseController(app, utils);
trainerController(app, utils);

// create a way for the express to serve react home page
app.get("/", (req, res) => {
  console.log("sending react homepage");
  res.sendFile(__dirname + "/react/build/index.html");
});

//listen to a specific port.
app.listen(process.env.PORT || 5000, () => {
  console.log(`Start listening for the port ${process.env.PORT}`);
});
