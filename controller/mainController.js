const fs = require("fs");
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const url = 'mongodb+srv://' +
    process.env.username + ':' +
    process.env.password + '@testdb.qzr4t.mongodb.net/' +
    process.env.database + '?retryWrites=true&w=majority';
const client = new MongoClient(url, { useNewUrlParser: true });

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

    app.get('/login/:username', (req, res) => {
        const username = req.params.username;
        console.log("receive post request; Current username: " + username);
        void client.connect((err, db) => {
            if (err) throw err;
            void client.db(process.env.database).collection("users").findOne({"username": username},
                (err, result) => {
                if (err) throw err;
                if (!result) res.render('error',
                    {errorCode: 403, errorMessage: "The user " + username + " does not exist"});
                else res.render('dashboard', {user: result})
            });
        });
    });


};