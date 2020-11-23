import React, { useEffect, useState } from "react";
import "./style/TrainerSchedule.css";
import axios from "axios";

const TrainerSchedule = ({ user, trainerId }) => {
  const [trainerSchedule, setTrainerSchedule] = useState([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);
  const [errMsg, setErrMsg] = useState("");
  const [msg, setMsg] = useState("");
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

  const loadTrainerSchedule = () => {
    const url = `./trainer/${trainerId}`;
    axios
      .get(url)
      .then((res) => {
        const data = res.data;
        if (data.length === 0) {
          setErrMsg("There is no schedule loaded!");
        } else {
          setErrMsg("");
          setTrainerSchedule(data);
        }
      })
      .catch((err) => {
        setErrMsg(err);
      });
  };

  const onScheduleClicked = (date, startTime) => {
    const url = "./trainer";
    const data = {
      username: user.username,
      trainerId: trainerId,
      date: date,
      startTime: startTime,
      endTime: startTime + 1,
    };
    axios
      .put(url, data)
      .then(() => {
        setMsg("Successfully make a appointment");
        loadTrainerSchedule();
        setTimeout(() => setMsg(""), 1000);
      })
      .catch(() => {
        setErrMsg("Fail make a appointment");
        setTimeout(() => setErrMsg(""), 1000);
      });
  };

  useEffect(() => {
    setErrMsg("Loading Schedule");
    loadTrainerSchedule();
  }, []);

  return (
    <div className={"schedule-container"}>
      <table className={`trainer-schedule`} >
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
                    trainerSchedule[date],
                    [startTime, startTime + 1]
                  );
                  return (
                    <td
                      key={`${date}-${startTime}`}
                      className={isAvailable ? "available" : "unavailable"}
                    >
                      <button
                        onClick={() => onScheduleClicked(date, startTime)}
                        disabled={!isAvailable}
                      >
                        Schedule
                      </button>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <p style={{ color: "red" }}>{errMsg}</p>
      <p style={{ color: "green" }}>{msg}</p>
    </div>
  );
};

export default TrainerSchedule;
