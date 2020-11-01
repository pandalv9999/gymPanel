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
  app.put("/course", (req, res) => {
    console.log(
      "receive " +
        req.body.username +
        " registering course " +
        req.body.courseId
    );
    let course;
    void client.connect((err, db) => {
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
  app.delete("/course/:username/:courseId", (req, res) => {
    const courseId = parseInt(req.params.courseId);
    console.log(
      "receive " +
        req.params.username +
        " unregister course " +
        req.params.courseId
    );
    let course;

    void client.connect((err, db) => {
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
                    $pull: { [identifier]: [course.startTime, course.endTime] },
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
  });
};
