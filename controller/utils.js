// this module has some useful util function for the main logic.
module.exports = {
  ROLE: {
    ADMIN: "admin",
    BASIC: "basic",
  },

  // this function converts a name of a day to the index of the week. 0-indexed.
  nameToDay: (name) => {
    switch (name) {
      case "Monday":
        return 0;
      case "Tuesday":
        return 1;
      case "Wednesday":
        return 2;
      case "Thursday":
        return 3;
      case "Friday":
        return 4;
      case "Saturday":
        return 5;
      case "Sunday":
        return 6;
      default:
        return -1;
    }
  },

  // check if there is overlap in a given list of intervals.
  existOverlap: (intervals) => {
    if (!intervals.length) return false;
    const preLen = intervals.length;
    intervals.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));
    let prev = intervals[0];
    const res = [prev];
    for (const curr of intervals) {
      if (curr[0] < prev[1]) {
        prev[1] = Math.max(prev[1], curr[1]);
      } else {
        res.push(curr);
        prev = curr;
      }
    }
    return res.length < preLen;
  },

  checkAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  },

  checkRole: (role) => {
    return (req, res, next) => {
      if (req.body.user.role !== role) {
        console.log("Role check fail");
        res.status(401);
        return res.send(
          `User ${req.user.username} is not allowed to view this content`
        );
      }
      console.log("role check success");
      next();
    };
  },

  existsScheduledTime: (intervals) => {
    for (const interval of intervals) {
      if (interval.length !== 0) {
        return true;
      }
    }
    return false;
  },

  smallestMissingId: (objects) => {
    const ids = [];
    for (const object of objects) {
      ids.push(object.id);
    }
    ids.sort();
    let result = 1;
    for (const id of ids) {
      if (result === id) {
        result++;
      } else {
        return result;
      }
    }
    return result;
  },
};
