// imported requires modules for this router
const fs = require("fs");
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

// initialize the database connecting criteria.
const url = 'mongodb+srv://' +
    process.env.username + ':' +
    process.env.password + '@testdb.qzr4t.mongodb.net/' +
    process.env.database + '?retryWrites=true&w=majority';
// The second argument in MongoClient is an object for not getting the deprecation warnings from MongoDB
const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = (app) => {

    // This router returns the main page for the application
    app.get('/index', (req, res) => {
        console.log("receiving get request for the home page");
        res.writeHead("200", {'content-Type': 'text/HTML'});
        fs.createReadStream(__dirname + "/../public/index.html").pipe(res)
    });

    // This router returns the view for user to register
    app.get('/register', (req, res) => {
        console.log("Todo: Handle register get request");
        res.render('register');
    });

    // This router lets user send their register info in the body of the request
    app.post('/create-data', (req, res) => {
        // Sending request to create a data
        void client.connect((err, db) => {
            if (err) throw err;

            // check if the username or email has been used
            client.db(process.env.database).collection("users").findOne({
                $or: [{
                    email: req.body.email
                }, {
                    username: req.body.username
                }]
            }).then(user => {
                if (user) {
                    let errors = {};
                    if (user.username === req.body.username) {
                        errors.username = "Username already exists, please go back to choose another username or directly login";
                    } else {
                        errors.email = "Email already exists, please go back to choose another email or directly login";
                    }
                    res.status(400).json(errors);
                } else {
                    // if the username or email has not been used, then create a new user
                    return client.db(process.env.database).collection("users").insertOne(
                        {
                            username: req.body.username,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            phone: req.body.phone,
                            DOB: req.body.username,
                            gender: req.body.gender,
                            weight: req.body.weight,
                            height: req.body.height,
                            registeredCourses: [],
                            scheduledAppointments: [],
                            scheduledTime: [[], [], [], [], [], [], []]


                        }, function (err, info) {
                            if (err) throw err;
                            console.log("Successfully create an account!");
                            //res.send("Successfully create an account!");
                            //res.json(info.ops)
                            res.redirect('/');
                        });
                }
            })
                .catch(err => {
                    return res.status(500).json({
                        error: err
                    });
                });
        });
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
                        // res.render('error', {errorCode: 403, errorMessage: "The user " + username + " does not exist"});
                        res.status(403).send(`Error! The user ${username} does not exist`);
                    } else {
                        console.log("User " + req.params.username + " login success.");
                        // res.render('dashboard', {user: result})
                        res.status(200).json(result);
                    }
                });
        });
    });
};