// imported requires modules for this router
const MongoClient = require("mongodb").MongoClient;
const encrypt = require("bcrypt");
require("dotenv").config();

// initialize the database connecting criteria.
const url =
  "mongodb+srv://" +
  process.env.username +
  ":" +
  process.env.password +
  "@testdb.qzr4t.mongodb.net/" +
  process.env.database +
  "?retryWrites=true&w=majority";
// The second argument in MongoClient is an object for not getting the deprecation warnings from MongoDB
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = (app, passport, utils) => {
  // This router lets user send their register info in the body of the request
  // modified for adding password authentication
  app.post("/create-data", (req, res) => {
    // Sending request to create a data
    void client.connect((err) => {
      if (err) throw err;

      // check if the username or email has been used
      client
        .db(process.env.database)
        .collection("users")
        .findOne({
          $or: [
            {
              email: req.body.email,
            },
            {
              username: req.body.username,
            },
          ],
        })
        .then(async (user) => {
          if (user) {
            let errors = {};
            if (user.username === req.body.username) {
              errors.username =
                "Username already exists, please go back to choose another username or directly login";
            } else {
              errors.email =
                "Email already exists, please go back to choose another email or directly login";
            }
            res.status(400).json(errors);
          } else {
            // if the username or email has not been used, then create a new user
            const hashedPassword = await encrypt.hash(req.body.password, 10);
            return client
              .db(process.env.database)
              .collection("users")
              .insertOne(
                {
                  username: req.body.username,
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  email: req.body.email,
                  password: hashedPassword,
                  phone: req.body.phone,
                  birthDate: req.body.birthDate,
                  gender: req.body.gender,
                  weight: req.body.weight,
                  height: req.body.height,
                  role: utils.ROLE.BASIC, // assign basic role to user
                  registeredCourses: [],
                  scheduledAppointments: [],
                  scheduledTime: [[], [], [], [], [], [], []],
                },
                function (err) {
                  if (err) throw err;
                  console.log("Successfully create an account!");
                  //res.send("Successfully create an account!");
                  //res.json(info.ops)
                  res.redirect("/");
                  //res.status(200);
                }
              );
          }
        })
        .catch((err) => {
          return res.status(500).json({
            error: err,
          });
        });
    });
  });

  // This router lets user update profile
  app.post("/edit/:username", (req, res) => {
    const query = { username: req.body.username };
    const newValues = {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        weight: req.body.weight,
        height: req.body.height,
      },
    };

    return client
      .db(process.env.database)
      .collection("users")
      .updateOne(query, newValues, function (err) {
        if (err) throw err;
        console.log("Successfully update the account!");
        res.redirect("/");
      });
  });

  // This router handle the get get user's request
  app.get("/user/:username", utils.checkAuthenticated, (req, res) => {
    const username = req.params.username;
    console.log("Received login request for " + username);
    void client.connect((err) => {
      if (err) throw err;

      // find whether current user is existed in the database.
      void client
        .db(process.env.database)
        .collection("users")
        .findOne({ username: username }, (err, result) => {
          if (err) throw err;
          if (!result) {
            console.log(
              "User " + req.params.username + " login failed! No user matches."
            );
            // res.render('error', {errorCode: 403, errorMessage: "The user " + username + " does not exist"});
            res.status(403).send(`Error! The user ${username} does not exist`);
          } else {
            console.log("User " + req.params.username + " login success.");
            // res.render('dashboard', {user: result})
            res.status(200).json(result);
          }
        });
    });
  });

  // This router handle the login request. Note that we have change the get request to actual post request.
  app.post("/login", passport.authenticate("local"), (req, res) => {
    console.log(`Authenticate user ${req.user.username} success`);
    res.status(200).json(req.user);
  });

  // This router handle the logout request.
  app.get("/logout", (req, res) => {
    req.logout();
    console.log("Logout user success!");
    res.redirect("/");
  });
};
