const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const url = 'mongodb+srv://' +
    process.env.username + ':' +
    process.env.password + '@testdb.qzr4t.mongodb.net/' +
    process.env.database + '?retryWrites=true&w=majority';
const client = new MongoClient(url, {useNewUrlParser: true});

module.exports = (app, utils) => {

    // register course for user
    app.put('/course', (req, res) => {
        console.log("receive " + req.body.username + " registering course " + req.body.courseId);
        let courseTime;
        void client.connect((err, db) => {
            if (err) throw err;
            client.db(process.env.database).collection("courses").findOne({id: req.body.courseId}).then(result => {
                if (result.length === 0) {
                    return null;
                }
                courseTime = {
                    date: result.date,
                    startTime: result.startTime,
                    endTime: result.endTime
                };
                return client.db(process.env.database).collection("users").findOne({username: req.body.username});
            }, err => console.log(err)).then(result => {
                if (!result || result.length === 0) {
                    return null;
                }
                const intervals = result.scheduledAppointments[utils.nameToDay(courseTime.date)]
                    .push([courseTime.startTime, courseTime.endTime]);
                if (utils.existOverlap(intervals)) {
                    return null;
                } else {
                    return client.db(process.env.database).collection("courses").updateOne(
                        {id: req.body.courseId, $expr: {$lt: [{$size: "$enrolledMember"}, "$capacity"]}},
                        {$push: {enrolledMember: req.body.username}});
                }
            }, err => console.log(err)).then(result => {
                if (!result || result.modifiedCount === 0) {
                    return null;
                } else {
                    return client.db(process.env.database).collection("users").updateOne(
                        {username: req.body.username},
                        {$push: {registeredCourses: req.body.courseId}});
                }
            }, err => console.log(err)).then(result => {
                if (!result || result.modifiedCount === 0) {
                    console.log(req.body.username + " fail registered course " + req.body.courseId);
                    res.sendStatus(409)
                } else {
                    console.log(req.body.username + " successfully registered course " + req.body.courseId);
                    res.sendStatus(200)
                }
            }, err => console.log(err)); // using $expr to prevent when two user register simultaneously, all of then will registered.
        });
    });

    // unregister course
    app.delete('/course', (req, res) => {
        console.log("receive " + req.body.username + " unregister course " + req.body.courseId);
        void client.connect((err, db) => {
            if (err) throw err;
            client.db(process.env.database).collection("courses").updateOne(
                {id: req.body.courseId, enrolledMember: req.body.username},
                {$pull: {enrolledMember: req.body.username}}).then(result => {
                if (result.modifiedCount === 0) {
                    return null;
                } else {
                    return client.db(process.env.database).collection("users").updateOne(
                        {username: req.body.username},
                        {$pull: {registeredCourses: req.body.courseId}});
                }
            }, err => console.log(err)).then(result => {
                if (!result) {
                    res.sendStatus(409);
                    console.log(req.body.username + " fail unregistered course " + req.body.courseId);
                } else {
                    console.log(req.body.username + " successfully unregistered course " + req.body.courseId);
                    res.sendStatus(200);
                }
            }, err => console.log(err));
        });
    });

};