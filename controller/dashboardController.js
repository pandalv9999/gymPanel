const fs = require("fs");

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
        // use mongoDB to load current user's schedule
        res.render('courses', {user: user})
    });

    app.get('/:username/trainers',  (req, res) => {
        const user = {username: req.params.username};
        // use mongoDB to load current user's schedule
        res.render('trainers', {user: user})
    });
};