// initialize some required modules and criteria
const express = require("express");
const mainController = require("./controller/mainController");
const dashboardController = require("./controller/dashboardController");
const courseController = require("./controller/courseController");
const trainerController = require("./controller/trainerController");
const utils = require("./controller/utils");
const bodyParser = require("body-parser");

// initialize the middleware of the app
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// initialize the routers of the app
mainController(app);
dashboardController(app);
courseController(app, utils);
trainerController(app, utils);

// create a way for the express to serve react home page
app.get('/', (req, res) => {
  console.log("sending react homepage");
  res.sendFile(__dirname+'/react/build/index.html');
});

//listen to a specific port.
app.listen(process.env.PORT || 5000, () => {
  console.log(`Start listening for the port ${process.env.PORT}` );
});
