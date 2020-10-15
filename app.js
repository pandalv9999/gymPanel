const express = require("express");
const mainController = require("./controller/mainController");
const dashboardController = require("./controller/dashboardController");
const bodyParser = require('body-parser');
const app = express();

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

mainController(app);
dashboardController(app);


app.listen(3000, () => {
    console.log("Start listening for the port 3000.")
});