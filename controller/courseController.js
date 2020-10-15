const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const url = 'mongodb+srv://' +
    process.env.username + ':' +
    process.env.password + '@testdb.qzr4t.mongodb.net/' +
    process.env.database + '?retryWrites=true&w=majority';
const client = new MongoClient(url, { useNewUrlParser: true });

module.exports = (app) => {

    // register course for user
    app.put('/course', (req, res) => {
        console.log("receive " + req.body.username + " registering course " + req.body.courseId);
        void client.connect((err, db) => {
            if (err) throw err;
            void client.db(process.env.database).collection("courses").updateOne(
                {id: req.body.courseId, $expr: {$lt: [{$size: "$enrolledMember"}, "$capacity"]}},
                {$push: {enrolledMember: req.body.username}}, (err, result) => {
                    if (err) throw err;
                    if (result.modifiedCount === 0) {
                        res.sendStatus(409);
                        console.log(req.body.username + " fail registered course " + req.body.courseId);
                    } else {
                        console.log(req.body.username + " successfully registered course " + req.body.courseId);
                        res.sendStatus(200)
                    }
                }); // using $expr to prevent when two user register simultaneously, all of then will registered.
            // todo: if user's profile is set up, need to add the course from user's courseTaken field
            // todo: if user has appointment with trainer, the register step will fail.
        });
    });

    // unregister course
    app.delete('/course', (req, res) => {
        console.log("receive " + req.body.username + " unregister course " + req.body.courseId);
        void client.connect((err, db) => {
            if (err) throw err;
            void client.db(process.env.database).collection("courses").updateOne(
                {id: req.body.courseId, enrolledMember: req.body.username},
                {$pull: {enrolledMember: req.body.username}}, (err, result) => {
                    if (err) throw err;
                    if (result.modifiedCount === 0) {
                        res.sendStatus(409);
                        console.log(req.body.username + " fail unregistered course " + req.body.courseId);
                    } else {
                        console.log(req.body.username + " successfully unregistered course " + req.body.courseId);
                        res.sendStatus(200)
                    }
                });
            // todo: if user's profile is set up, need to delete the course from user's courseTaken field
        });
    });

};