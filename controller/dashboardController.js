const fs = require("fs");

module.exports = (app) => {

    // Here is only a test snippet that test the functionality of multiple controller.
    app.get('/dashboard',  (req, res) => {
        console.log("The log message here is only for test purpose");
        fs.createReadStream(__dirname + "/../public/index.html").pipe(res)
    })
};