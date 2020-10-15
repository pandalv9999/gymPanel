const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const url = 'mongodb+srv://' +
    process.env.username + ':' +
    process.env.password + '@testdb.qzr4t.mongodb.net/' +
    process.env.database + '?retryWrites=true&w=majority';
const client = new MongoClient(url, { useNewUrlParser: true });

module.exports = (app) => {

    // Here is only a test snippet that test the functionality of multiple controller.
    app.get('/:username/schedule',  (req, res) => {
        const user = {username: req.params.username};
        // use mongoDB to load current user's schedule
        res.render('schedule', {user: user})
    });

    app.get('/:username/profile',  (req, res) => {
        const user = {username: req.params.username};
        // use mongoDB to load current user's schedule
        res.render('profile', {user: user})
    });

    app.get('/:username/courses',  (req, res) => {
        const user = {username: req.params.username};
        void client.connect((err, db) => {
            if (err) throw err;
            void client.db(process.env.database).collection("courses").find({}).toArray((err, result) => {
                if (err) throw err;
                console.log("Successfully got courses for user " + req.params.username);
                res.render('courses', {user: user, courses: result})
            });
        });
    });

    app.get('/:username/trainers',  (req, res) => {
        const user = {username: req.params.username};
        // use mongoDB to load current user's schedule
        res.render('trainers', {user: user})
    });
};