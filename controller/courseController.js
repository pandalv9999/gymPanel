// import require modules for node.js
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

// set up database criteria.
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

// exported module for the main router.
module.exports = (app, utils) => {
  // This router handles the put request from the front-end in order to register a course to a user.
  app.put("/course", utils.checkAuthenticated, (req, res) => {
    console.log(
      "receive " +
        req.body.username +
        " registering course " +
        req.body.courseId
    );
    let course;
    void client.connect((err) => {
      if (err) throw err;

      // get the course detail from the database by querying. Get date, start time, end time.
      client
        .db(process.env.database)
        .collection("courses")
        .findOne({ id: req.body.courseId })
        .then(
          (result) => {
            if (result.length === 0) {
              return null;
            }
            course = result;

            // get the user's scheduled time slot and check if there is conflicts to the current inserted interval.
            return client
              .db(process.env.database)
              .collection("users")
              .findOne({ username: req.body.username });
          },
          (err) => console.log(err)
        )
        .then(
          (result) => {
            if (!result || result.length === 0) {
              return null;
            }
            const intervals =
              result.scheduledTime[utils.nameToDay(course.date)];
            intervals.push([course.startTime, course.endTime]);
            if (utils.existOverlap(intervals)) {
              return null;
            } else {
              // check if there is any available spot for the current course.
              // and add the current member to the registered list of the course.
              return client
                .db(process.env.database)
                .collection("courses")
                .updateOne(
                  {
                    id: req.body.courseId,
                    $expr: { $lt: [{ $size: "$enrolledMember" }, "$capacity"] },
                  },
                  { $push: { enrolledMember: req.body.username } }
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
              // add the current course to user's related field: registeredCourse.
              return client
                .db(process.env.database)
                .collection("users")
                .updateOne(
                  { username: req.body.username },
                  { $push: { registeredCourses: course } }
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
              // add the current interval to user's scheduled time table.
              const identifier =
                "scheduledTime." + utils.nameToDay(course.date);
              return client
                .db(process.env.database)
                .collection("users")
                .updateOne(
                  { username: req.body.username },
                  {
                    $push: { [identifier]: [course.startTime, course.endTime] },
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
                req.body.username +
                  " fail registered course " +
                  req.body.courseId
              );
              res.sendStatus(409);
            } else {
              console.log(
                req.body.username +
                  " successfully registered course " +
                  req.body.courseId
              );
              res.sendStatus(200);
            }
          },
          (err) => console.log(err)
        );
    });
  });

  // This router handles the delete request from the front end to unregister a user to a course.
  app.delete(
    "/course/:username/:courseId",
    utils.checkAuthenticated,
    (req, res) => {
      const courseId = parseInt(req.params.courseId);
      console.log(
        "receive " +
          req.params.username +
          " unregister course " +
          req.params.courseId
      );
      let course;

      void client.connect((err) => {
        if (err) throw err;

        // get the detailed information of current course, including data, start time and end time.
        client
          .db(process.env.database)
          .collection("courses")
          .findOne({ id: courseId })
          .then(
            (result) => {
              if (result.length === 0) {
                return null;
              }
              course = result;

              // remove current user from the course's enrollment list.
              return client
                .db(process.env.database)
                .collection("courses")
                .updateOne(
                  { id: courseId, enrolledMember: req.params.username },
                  { $pull: { enrolledMember: req.params.username } }
                );
            },
            (err) => console.log(err)
          )
          .then(
            (result) => {
              if (result.modifiedCount === 0) {
                return null;
              } else {
                // remove the current course from user's registeredCourse list.
                return client
                  .db(process.env.database)
                  .collection("users")
                  .updateOne(
                    { username: req.params.username },
                    { $pull: { registeredCourses: { id: courseId } } }
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
                // remove the course' time interval to user's scheduled time table .
                const identifier =
                  "scheduledTime." + utils.nameToDay(course.date);
                return client
                  .db(process.env.database)
                  .collection("users")
                  .updateOne(
                    { username: req.params.username },
                    {
                      $pull: {
                        [identifier]: [course.startTime, course.endTime],
                      },
                    }
                  );
              }
            },
            (err) => console.log(err)
          )
          .then(
            (result) => {
              if (!result) {
                res.sendStatus(409);
                console.log(
                  req.params.username + " fail unregistered course " + courseId
                );
              } else {
                console.log(
                  req.params.username +
                    " successfully unregistered course " +
                    courseId
                );
                res.sendStatus(200);
              }
            },
            (err) => console.log(err)
          );
      });
    }
  );

  // This router handles the requests to modify information of existing courses
  app.put(
    "/admin/course",
    utils.checkAuthenticated,
    utils.checkRole(utils.ROLE.ADMIN),
    (req, res) => {
      const modifiedCourse = req.body;
      let newInstructor;
      const time = modifiedCourse.time.split("-");
      console.log(`Modifying the information of course ${modifiedCourse.id}`);
      void client.connect((err) => {
        if (err) throw err;

        // get the trainer from database to see if there is time conflict for the course's start time and end time
        client
          .db(process.env.database)
          .collection("trainers")
          .findOne({ id: parseInt(modifiedCourse.instructor.id) })
          .then(
            (result) => {
              if (!result || result.length === 0) {
                return null;
              }
              newInstructor = result;
              const intervals = result.scheduledTime[
                utils.nameToDay(modifiedCourse.date)
              ].push([parseInt(time[0]), parseInt(time[1])]);
              if (utils.existOverlap(intervals)) {
                return null;
              } else {
                // remove the schedule time of previous instructor
                const identifier =
                  "scheduledTime." +
                  utils.nameToDay(modifiedCourse.prevCourse.date);
                return client
                  .db(process.env.database)
                  .collection("trainers")
                  .updateOne(
                    { id: modifiedCourse.prevCourse.instructor.id },
                    {
                      $pull: {
                        [identifier]: [
                          modifiedCourse.prevCourse.startTime,
                          modifiedCourse.prevCourse.endTime,
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
              }

              // push the new time interval to the newly assigned instructor
              const identifier =
                "scheduledTime." + utils.nameToDay(modifiedCourse.date);
              return client
                .db(process.env.database)
                .collection("trainers")
                .updateOne(
                  { id: newInstructor.id },
                  {
                    $push: {
                      [identifier]: [parseInt(time[0]), parseInt(time[1])],
                    },
                  }
                );
            },
            (err) => console.log(err)
          )
          .then(
            (result) => {
              if (!result || result.modifiedCount === 0) {
                return null;
              }

              // finally modify courses
              return client
                .db(process.env.database)
                .collection("courses")
                .updateOne(
                  { id: modifiedCourse.id },
                  {
                    $set: {
                      courseName: modifiedCourse.courseName,
                      url: modifiedCourse.url,
                      date: modifiedCourse.date,
                      startTime: parseInt(time[0]),
                      endTime: parseInt(time[1]),
                      description: modifiedCourse.description,
                      capacity: modifiedCourse.capacity,
                      instructor: newInstructor,
                    },
                  }
                );
            },
            (err) => console.log(err)
          )
          .then(
            (result) => {
              if (!result || result.modifiedCount === 0) {
                console.log("fail modifying course information");
                res.sendStatus(409);
              } else {
                console.log("Success modifying course information");
                res.sendStatus(200);
              }
            },
            (err) => console.log(err)
          );
      });
    }
  );

  app.post(
    "/admin/course",
    utils.checkAuthenticated,
    utils.checkRole(utils.ROLE.ADMIN),
    (req, res) => {
      const course = req.body;
      const time = course.time.split("-"); // string
      console.log(`Adding course ${course.courseName}`);

      void client.connect((err) => {
        if (err) throw err;

        // find if there is time conflict for the instructor
        client
          .db(process.env.database)
          .collection("trainers")
          .findOne({ id: course.instructor.id })
          .then(
            (result) => {
              if (!result) {
                return null;
              }
              const intervals = result.scheduledTime[
                utils.nameToDay(course.date)
              ].push([parseInt(time[0]), parseInt(time[1])]);
              if (utils.existOverlap(intervals)) {
                return null;
              } else {
                // insert the time interval to the assigned trainer
                const identifier =
                  "scheduledTime." + utils.nameToDay(course.date);
                return client
                  .db(process.env.database)
                  .collection("trainers")
                  .updateOne(
                    { id: course.instructor.id },
                    {
                      $push: {
                        [identifier]: [parseInt(time[0]), parseInt(time[1])],
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
              }

              // find how many courses are there
              return client
                .db(process.env.database)
                .collection("courses")
                .find({})
                .toArray();
            },
          )
          .then(
            (result) => {
              if (!result) {
                return null;
              }

              // insert the new course to database
              return client
                .db(process.env.database)
                .collection("courses")
                .insertOne({
                  id: utils.smallestMissingId(result),
                  courseName: course.courseName,
                  url: course.url,
                  date: course.date,
                  startTime: parseInt(time[0]),
                  endTime: parseInt(time[1]),
                  description: course.description,
                  capacity: course.capacity,
                  instructor: course.instructor,
                  enrolledMember: [],
                });
            },
            (err) => console.log(err)
          )
          .then((result) => {
            if (!result) {
              console.log(`Adding new course ${course.courseName} Fail!`);
              res.sendStatus(409);
            } else {
              console.log(`Adding new course ${course.courseName} Success!`);
              res.sendStatus(200);
            }
          });
      });
    }
  );

  app.post(
    "/admin/course/delete",
    utils.checkAuthenticated,
    utils.checkRole(utils.ROLE.ADMIN),
    (req, res) => {
      let course = req.body;
      console.log(`Deleting course ${course.courseName}`);
      void client.connect((err) => {
        if (err) throw err;

        // check if current course has registered member:
        client
          .db(process.env.database)
          .collection("courses")
          .findOne({ id: course.id })
          .then(
            (result) => {
              if (!result) {
                return null;
              } else if (result.enrolledMember.length > 0) {
                return null;
              }

              // remove the scheduled time of current assigned instructor
              course = result;
              const identifier =
                "scheduledTime." + utils.nameToDay(course.date);
              return client
                .db(process.env.database)
                .collection("trainers")
                .updateOne(
                  {
                    id: course.instructor.id,
                  },
                  {
                    $pull: {
                      [identifier]: [course.startTime, course.endTime],
                    },
                  }
                );
            },
            (err) => console.log(err)
          )
          .then(
            (result) => {
              if (!result || result.modifiedCount === 0) {
                return null;
              }

              // remove the course from database
              return client
                .db(process.env.database)
                .collection("courses")
                .deleteOne({ id: course.id });
            },
            (err) => console.log(err)
          )
          .then(
            (result) => {
              if (!result || result.deletedCount === 0) {
                console.log(`Deleting course ${course.id} fail`);
                res.sendStatus(409);
              } else {
                console.log(`Deleting course ${course.id} success`);
                res.sendStatus(200);
              }
            },
            (err) => console.log(err)
          );
      });
    }
  );
};
