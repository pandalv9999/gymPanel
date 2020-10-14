const express = require("express");
const mainController = require("./controller/mainController");
const app = express();

app.use(express.static('./public'));

mainController(app);



app.listen(3000, () => {
    console.log("Start listening for the port 3000.")
});