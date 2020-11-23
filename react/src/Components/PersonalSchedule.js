import React from "react";
import "./style/PersonalSchedule.css";

const PersonalSchedule = ({ user }) => {
  const personalSchedule = user.scheduledTime;
  const dates = [0, 1, 2, 3, 4, 5, 6];
  const startTimes = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

  const isAvailableForInterval = (intervals, interval) => {
    for (let curr of intervals) {
      if (curr[0] === interval[0] && curr[1] === interval[1]) {
        return false;
      }
    }
    return true;
  };

  return (
    <table className={`trainer-schedule`}>
      <thead>
        <tr>
          <th className={"first-row"}>Time</th>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
          <th>Saturday</th>
          <th>Sunday</th>
        </tr>
      </thead>
      <tbody>
        {startTimes.map((startTime) => {
          return (
            <tr key={startTime}>
              <td className={"first-row"}>{`${startTime}--${
                startTime + 1
              }`}</td>
              {dates.map((date) => {
                const isAvailable = isAvailableForInterval(
                  personalSchedule[date],
                  [startTime, startTime + 1]
                );
                return (
                  <td
                    key={`${date}-${startTime}`}
                    className={isAvailable ? "available" : "unavailable"}
                  >
                    <button aria-label="Choose" disabled={true} />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PersonalSchedule;
