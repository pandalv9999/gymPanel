// imported requires modules for this router
const fs = require("fs");
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

// initialize the database connecting criteria.
const url = 'mongodb+srv://' +
    process.env.username + ':' +
    process.env.password + '@testdb.qzr4t.mongodb.net/' +
    process.env.database + '?retryWrites=true&w=majority';
const client = new MongoClient(url, { useNewUrlParser: true });

module.exports = (app) => {

    // This router returns the main page for the application
    app.get('/index',  (req, res) => {
        console.log("receiving get request for the home page");
        res.writeHead("200", {'content-Type': 'text/HTML'});
        fs.createReadStream(__dirname + "/../public/index.html").pipe(res)
    });

    // get request to getting the view for user to login
    app.get('/register', (req, res) => {
        console.log("Todo: Handle register get request");
        res.render('register');
    });

    // post request is where user send their register credentials in the body of the request
    app.post('/register', (req, res) => {
        console.log("Todo: Handle register post request");
        res.send("Todo: Handle register post request");
    });

    // This router handle the get request from the front-end to handle the log-in features
    // Note that I use get request for simplicity. Post request will be more appropriate in the current situation.
    app.get('/:username', (req, res) => {
        const username = req.params.username;
        console.log("Received login request for " + username);
        void client.connect((err, db) => {
            if (err) throw err;

            // find whether current user is existed in the database.
            void client.db(process.env.database).collection("users").findOne({"username": username},
                (err, result) => {
                if (err) throw err;
                if (!result) {
                    console.log("User " + req.params.username + " login failed! No user matches.");
                    res.render('error', {errorCode: 403, errorMessage: "The user " + username + " does not exist"});
                }
                else {
                    console.log("User " + req.params.username + " login success.");
                    res.render('dashboard', {user: result})
                }
            });
        });
    });


};