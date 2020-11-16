// import the require module for this sub-router.
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

// initialize the database connection criteria.
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
  // this router handle the get request for the front end to get all time slot for a specific trainer.
  app.get("/trainer/:trainerId", (req, res) => {
    const trainerId = req.params.trainerId;
    console.log("Receiver request to get the schedule of trainer " + trainerId);
    void client.connect((err) => {
      if (err) throw err;

      // get all time slot for a specific trainer.
      client
        .db(process.env.database)
        .collection("trainers")
        .findOne({ id: parseInt(trainerId) }, (err, result) => {
          if (err) throw err;
          if (!result || result.length === 0) {
            res.status(404).send("Trainer " + trainerId + " is not found!");
          } else {
            res.status(200).json(result.scheduledTime);
          }
        });
    });
  });

  // This router handles the request for a user to make a schedule to a trainer for a specific time slot.
  app.put("/trainer", utils.checkAuthenticated, (req, res) => {
    const appointment = req.body;
    console.log(`Received request for user ${appointment.username} to schedule ${appointment.startTime} 
        - ${appointment.endTime} for trainer ${appointment.trainerId} at day ${appointment.date}`);
    void client.connect((err) => {
      if (err) throw err;

      // Get the scheduled times for the current user to check if there is conflict.
      client
        .db(process.env.database)
        .collection("users")
        .findOne({ username: appointment.username })
        .then(
          (result) => {
            if (!result) return null;
            const appointmentIntervals = result.scheduledTime[appointment.date];
            appointmentIntervals.push([
              appointment.startTime,
              appointment.endTime,
            ]);
            if (utils.existOverlap(appointmentIntervals)) {
              return null;
            } else {
              // Get the time table for the trainer to check whether there is a time conflict for the trainer.
              return client
                .db(process.env.database)
                .collection("trainers")
                .findOne({ id: appointment.trainerId });
            }
          },
          (err) => console.log(err)
        )
        .then(
          (result) => {
            if (!result || result.length === 0) return null;
            appointment.trainer = result;
            const intervals = result.scheduledTime[appointment.date];
            intervals.push([appointment.startTime, appointment.endTime]);
            if (utils.existOverlap(intervals)) {
              return null;
            } else {
              // push the current time slot to the user's scheduled time.
              const identifier = "scheduledTime." + appointment.date;
              return client
                .db(process.env.database)
                .collection("users")
                .updateOne(
                  { username: appointment.username },
                  {
                    $push: {
                      [identifier]: [
                        appointment.startTime,
                        appointment.endTime,
                      ],
                    },
                  }
                );
            }
          },
          (err) => console.log(err)
        )
        .then(
          (result) => {
            if (!result || result.modifiedCount === 0) {
              return null;
            } else {
              // push the current appointment to the user's scheduled appointment list.
              return client
                .db(process.env.database)
                .collection("users")
                .updateOne(
                  { username: appointment.username },
                  { $push: { scheduledAppointments: appointment } }
                );
            }
          },
          (err) => console.log(err)
        )
        .then(
          (result) => {
            if (!result || result.modifiedCount === 0) {
              return null;
            } else {
              // push the current appointment to the trainer scheduled appointment list.
              const identifier = "scheduledTime." + appointment.date;
              return client
                .db(process.env.database)
                .collection("trainers")
                .updateOne(
                  { id: appointment.trainerId },
                  {
                    $push: {
                      [identifier]: [
                        appointment.startTime,
                        appointment.endTime,
                      ],
                    },
                  }
                );
            }
          },
          (err) => console.log(err)
        )
        .then(
          (result) => {
            if (!result || result.modifiedCount === 0) {
              console.log(
                appointment.username +
                  " fail schedule appointment with " +
                  appointment.trainerId
              );
              res.sendStatus(409);
            } else {
              console.log(
                appointment.username +
                  " successfully schedule appointment with " +
                  appointment.trainerId
              );
              res.sendStatus(200);
            }
          },
          (err) => console.log(err)
        );
    });
  });

  // This route handles the request for a user to cancel a appointment with a specific trainer at a specific time
  app.delete(
    "/trainer/:username/:trainerId/:date/:startTime",
    utils.checkAuthenticated,
    (req, res) => {
      const username = req.params.username;
      const trainerId = req.params.trainerId;
      const date = req.params.date;
      const startTime = parseInt(req.params.startTime);
      const endTime = startTime + 1;
      console.log(`Received request for user ${username} to cancel appointment with ${trainerId}
         at date ${date}, ${startTime} - ${endTime}`);
      void client.connect((err) => {
        if (err) throw err;

        // remove current time slot from user's scheduled time
        const identifier = "scheduledTime." + date;
        client
          .db(process.env.database)
          .collection("users")
          .updateOne(
            { username: username },
            { $pull: { [identifier]: [startTime, endTime] } }
          )
          .then(
            (result) => {
              if (!result || result.modifiedCount === 0) {
                return null;
              } else {
                // remove current time slot from trainer's scheduled time
                const identifier = "scheduledTime." + date;
                return client
                  .db(process.env.database)
                  .collection("trainers")
                  .updateOne(
                    { id: parseInt(trainerId) },
                    { $pull: { [identifier]: [startTime, endTime] } }
                  );
              }
            },
            (err) => console.log(err)
          )
          .then(
            (result) => {
              if (!result || result.modifiedCount === 0) {
                return null;
              } else {
                // remove current appointment from user's appointment list
                return client
                  .db(process.env.database)
                  .collection("users")
                  .updateOne(
                    { username: username },
                    {
                      $pull: {
                        scheduledAppointments: {
                          username: username,
                          trainerId: parseInt(trainerId),
                          date: parseInt(date),
                          startTime: startTime,
                        },
                      },
                    }
                  );
              }
            },
            (err) => console.log(err)
          )
          .then(
            (result) => {
              if (!result || result.modifiedCount === 0) {
                console.log(
                  username + " fail cancel appointment with " + trainerId
                );
                res.sendStatus(409);
              } else {
                console.log(
                  username +
                    " successfully cancel appointment with " +
                    trainerId
                );
                res.sendStatus(200);
              }
            },
            (err) => console.log(err)
          );
      });
    }
  );

  // This router handles admin request that modify existing trainer
  app.put(
    "/admin/trainer",
    utils.checkAuthenticated,
    utils.checkRole(utils.ROLE.ADMIN),
    (req, res) => {
      const modifiedTrainer = req.body;
      console.log(`Modifying trainer information of id ${modifiedTrainer.id}`);
      void client.connect((err) => {
        if (err) throw err;

        // Find the trainer from database then give it new values.
        client
          .db(process.env.database)
          .collection("trainers")
          .updateOne(
            {
              id: modifiedTrainer.id,
            },
            {
              $set: {
                url: modifiedTrainer.url,
                name: modifiedTrainer.name,
                description: modifiedTrainer.description,
              },
            }
          )
          .then(
            (result) => {
              if (!result || result.modifiedCount === 0) {
                console.log(
                  `Fail to modify specific trainer with id ${modifiedTrainer.id}`
                );
                res.sendStatus(409);
              } else {
                console.log(
                  `Success modify specific trainer with id ${modifiedTrainer.id}`
                );
                res.sendStatus(200);
              }
            },
            (err) => console.log(err)
          );
      });
    }
  );

  // this router handles the add new request from the front end
  app.post(
    "/admin/trainer",
    utils.checkAuthenticated,
    utils.checkRole(utils.ROLE.ADMIN),
    (req, res) => {
      const newTrainer = req.body;
      console.log("Adding new trainer to database");
      void client.connect((err) => {
        if (err) throw err;

        // get all trainers from database to see the total number of trainer
        client
          .db(process.env.database)
          .collection("trainers")
          .find({})
          .toArray()
          .then(
            (result) => {
              if (!result) {
                return null;
              }

              // insert the new document into database
              return client
                .db(process.env.database)
                .collection("trainers")
                .insertOne({
                  id: utils.smallestMissingId(result),
                  url: newTrainer.url,
                  name: newTrainer.name,
                  description: newTrainer.description,
                  comments: [],
                  scheduledTime: [[], [], [], [], [], [], []],
                });
            },
            (err) => console.log(err)
          )
          .then(
            (result) => {
              if (!result) {
                console.log("Adding new trainer failed");
                res.status(400);
              } else {
                console.log("Adding new trainer success");
                res.sendStatus(200);
              }
            },
            (err) => console.log(err)
          );
      });
    }
  );

  // this router handles the request to remove a certain trainer from database.
  app.post(
    "/admin/trainer/delete",
    utils.checkAuthenticated,
    utils.checkRole(utils.ROLE.ADMIN),
    (req, res) => {
      const trainer = req.body;
      console.log(`Deleting trainer with trainer Id ${trainer.id}`);
      void client.connect((err) => {
        if (err) throw err;

        // get Trainer from database to get the newest version of the trainer
        client
          .db(process.env.database)
          .collection("trainers")
          .findOne({ id: trainer.id })
          .then(
            (result) => {
              if (!result) {
                return null;

                // check if current trainers has appointments or registered course.
              } else if (utils.existsScheduledTime(result.scheduledTime)) {
                return null;
              } else {
                return client
                  .db(process.env.database)
                  .collection("trainers")
                  .deleteOne({ id: trainer.id });
              }
            },
            (err) => console.log(err)
          )
          .then(
            (result) => {
              if (!result || result.deletedCount === 0) {
                console.log(
                  `Fail Deleting trainer with trainer Id ${trainer.id}`
                );
                res.sendStatus(409);
              } else {
                console.log(
                  `Successfully Deleting trainer with trainer Id ${trainer.id}`
                );
                res.sendStatus(200);
              }
            },
            (err) => console.log(err)
          );
      });
    }
  );
};
