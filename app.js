// initialize some required modules and criteria
const express = require("express");
const mainController = require("./controller/mainController");
const dashboardController = require("./controller/dashboardController");
const courseController = require("./controller/courseController");
const trainerController = require("./controller/trainerController");
const utils = require("./controller/utils");
const bodyParser = require('body-parser');

// initialize the middleware of the app
const app = express();
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// initialize the routers of the app
mainController(app);
dashboardController(app);
courseController(app, utils);
trainerController(app, utils);

//listen to a specific port.
app.listen(3000, () => {
    console.log("Start listening for the port 3000.")
});