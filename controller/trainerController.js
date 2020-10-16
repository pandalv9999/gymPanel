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
                    res.json(result.avaliableTime)
                }
            });
        });
    });


};