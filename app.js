const express = require("express");
const mainController = require("./controller/mainController");
const dashboardController = require("./controller/dashboardController");
const app = express();

app.use(express.static("./public"));

mainController(app);
dashboardController(app);


app.listen(3000, () => {
    console.log("Start listening for the port 3000.")
});