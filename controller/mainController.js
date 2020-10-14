const fs = require("fs");

module.exports = (app) => {

    // handles the request for the main page
    app.get('/index',  (req, res) => {
        console.log("receiving get request for the home page");
        fs.createReadStream(__dirname + "/../public/index.html").pipe(res)
    })
};