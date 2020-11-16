const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const url =
  "mongodb+srv://" +
  process.env.username +
  ":" +
  process.env.password +
  "@testdb.qzr4t.mongodb.net/" +
  process.env.database +
  "?retryWrites=true&w=majority";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = (app, utils) => {
  app.get("/:username/courses", utils.checkAuthenticated, (req, res) => {
    void client.connect((err) => {
      if (err) throw err;
      void client
        .db(process.env.database)
        .collection("courses")
        .find({})
        .toArray((err, result) => {
          if (err) throw err;
          console.log(
            "Successfully got courses for user " + req.params.username
          );
          // res.render('courses', {user: user, courses: result})
          res.status(200).json(result);
        });
    });
  });

  app.get("/:username/trainers", utils.checkAuthenticated, (req, res) => {
    void client.connect((err) => {
      if (err) throw err;
      void client
        .db(process.env.database)
        .collection("trainers")
        .find({})
        .toArray((err, result) => {
          if (err) throw err;
          console.log(
            "Successfully got trainer for user " + req.params.username
          );
          // res.render('trainers', {user: user, trainers: result})
          res.status(200).json(result);
        });
    });
  });
};
