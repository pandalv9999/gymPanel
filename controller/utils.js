module.exports =  {
    nameToDay: function(name) {
        switch (name) {
            case "Monday": return 0;
            case "Tuesday": return 1;
            case "Wednesday": return 2;
            case "Thursday": return 3;
            case "Friday": return 4;
            case "Saturday": return 5;
            case "Sunday": return 6;
            default: return -1;
        }
    },

    existOverlap: function (intervals) {
        if (!intervals.length) return false;
        const preLen = intervals.length;
        intervals.sort((a, b) => a.start !== b.start ? a.start - b.start : a.end - b.end);
        let prev = intervals[0];
        const res = [prev];
        for (const curr of intervals) {
            if (curr.start <= prev.end) {
                prev.end = Math.max(prev.end, curr.end)
            } else {
                res.push(curr);
                prev = curr
            }
        }
        return res.length <= preLen;

    },

    convertCoursesToInterval: function (courses) {
        let intervals = [[], [], [], [], [], [], []];
        for (let course of courses) {
            intervals[this.nameToDay(course.courseTime.date)]
                .push([course.courseTime.startTime, course.courseTime.endTime])
        }
        return intervals;
    }
};