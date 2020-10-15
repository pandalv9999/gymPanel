const fs = require("fs");

module.exports = (app) => {

    // handles the request for the main page
    app.get('/index',  (req, res) => {
        console.log("receiving get request for the home page");
        res.writeHead("200", {'content-Type': 'text/HTML'});
        fs.createReadStream(__dirname + "/../public/index.html").pipe(res)
    });

    // get request to getting the view for user to login
    app.get('/register', (req, res) => {
        console.log("Todo: Handle register get request");
        res.send("Todo: Handle register get request");
    });

    // post request is where user send their register credentials in the body of the request
    app.post('/register', (req, res) => {
        console.log("Todo: Handle register post request");
        res.send("Todo: Handle register post request");
    });

    app.get('/login', (req, res) => {
        console.log("Todo: Handle login get request");
        res.send("Todo: Handle login get request");
    });

    // I have already handled to sending of post request from the client end.
    // At here I just log the received username and print it out. Communication to mongoDB needs to be implemented.
    app.post('/login', (req, res) => {
        const username = req.body.username;
        console.log("receive post request; Current username: " + username);
        res.sendStatus(200);
    });

};