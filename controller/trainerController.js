const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const url = 'mongodb+srv://' +
    process.env.username + ':' +
    process.env.password + '@testdb.qzr4t.mongodb.net/' +
    process.env.database + '?retryWrites=true&w=majority';
const client = new MongoClient(url, { useNewUrlParser: true });

module.exports = (app, utils) => {

    app.get("/trainer/:trainerId", (req,res) => {
        const trainerId = req.params.trainerId;
        console.log("Receiver request to get the schedule of trainer " + trainerId);
        void client.connect((err, db) => {
            if (err) throw err;
            client.db(process.env.database).collection("trainers").findOne({id: parseInt(trainerId)}, (err, result) => {
                if (err) throw err;
                if (!result || result.length === 0) {
                    res.writeHead(404);
                    res.end("Trainer " + trainerId + " is not found!");
                } else {
                    res.json(result.scheduledTime)
                }
            });
        });
    });

    app.put("/trainer", (req, res) => {
        const appointment = req.body;
        console.log(`Received request for user ${appointment.username} to schedule ${appointment.startTime} 
        - ${appointment.endTime} for trainer ${appointment.trainerId} at day ${appointment.date}`);
        void client.connect((err, db) => {
            if (err) throw err;
            client.db(process.env.database).collection("users").findOne({username: appointment.username}).then(result => {
                if (!result) return null;
                const appointmentIntervals = result.scheduledTime[appointment.date];
                appointmentIntervals.push([appointment.startTime, appointment.endTime]);
                if (utils.existOverlap(appointmentIntervals)) {
                    return null;
                } else {
                    return client.db(process.env.database).collection("trainers")
                        .findOne({id: appointment.trainerId});
                }
            }, err => console.log(err)).then(result => {
                if (!result || result.length === 0) return null;
                const intervals = result.scheduledTime[appointment.date]
                    .push([appointment.startTime, appointment.endTime]);
                if (utils.existOverlap(intervals)) {
                    return null;
                } else {
                    const identifier = "scheduledTime." + appointment.date;
                    return client.db(process.env.database).collection("users").updateOne(
                        {username: appointment.username},
                        {$push: {[identifier]: [appointment.startTime, appointment.endTime]}}
                        );
                }
            }, err => console.log(err)).then(result => {
                if (!result || result.modifiedCount === 0) {
                    return null;
                } else {
                    return client.db(process.env.database).collection("users").updateOne(
                        {username: appointment.username},
                        {$push: {scheduledAppointments: appointment}}
                    );
                }
            }, err => console.log(err)).then(result => {
                if (!result || result.modifiedCount === 0) {
                    return null;
                } else {
                    const identifier = "scheduledTime." + appointment.date;
                    return client.db(process.env.database).collection("trainers").updateOne(
                        {id: appointment.trainerId},
                        {$push: {[identifier]: [appointment.startTime, appointment.endTime]}}
                    );
                }
            }, err => console.log(err)).then(result => {
                if (!result || result.modifiedCount === 0) {
                    console.log(appointment.username + " fail schedule appointment with " + appointment.trainerId);
                    res.sendStatus(409)
                } else {
                    console.log(appointment.username + " successfully schedule appointment with " + appointment.trainerId);
                    res.sendStatus(200)
                }
            }, err => console.log(err));
        });
    });


};