// this module has some useful util function for the main logic.
module.exports = {
  // this function converts a name of a day to the index of the week. 0-indexed.
  nameToDay: function (name) {
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
  existOverlap: function (intervals) {
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
};
