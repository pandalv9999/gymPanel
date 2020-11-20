import React, { useEffect, useState } from "react";
import PersonalSchedule from "./PersonalSchedule";
import "./style/Schedule.css";
import axios from "axios";

const Schedule = ({ user }) => {
  // since each time we update the schedule, we have to load user again
  const [currUser, setCurrUser] = useState(user);
  const [errMsg, setErrMsg] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    console.log("loading curr");
    getCurrentUser();
  }, []);

  const getCurrentUser = () => {
    const url = "./user/" + user.username;
    axios
      .get(url)
      .then((res) => {
        console.log("success");
        setCurrUser(res.data);
      })
      .catch((err) => {
        console.log("error");
      });
  };

  const unregisterCourse = (courseId) => {
    const url = `./course/${currUser.username}/${courseId}`;
    axios
      .delete(url)
      .then(() => {
        const msg = `${currUser.username} unregister course ${courseId} success!`;
        console.log(msg);
        setMsg(msg);
        setTimeout(() => setMsg(""), 1000);
        getCurrentUser();
      })
      .catch(() => {
        const msg = `${currUser.username} unregister course ${courseId} fail!`;
        console.log(msg);
        setErrMsg(msg);
        setTimeout(() => setErrMsg(""), 1000);
      });
  };

  const cancelAppointment = (trainerId, date, startTime) => {
    const url = `/trainer/${currUser.username}/${trainerId}/${date}/${startTime}`;
    axios
      .delete(url)
      .then(() => {
        const msg = `${currUser.username} cancel appoint with ${trainerId} success!`;
        console.log(msg);
        setMsg(msg);
        setTimeout(() => setMsg(""), 1000);
        getCurrentUser();
      })
      .catch(() => {
        const msg = `${currUser.username} cancel appoint with ${trainerId} success!`;
        console.log(msg);
        setErrMsg(msg);
        setTimeout(() => setErrMsg(""), 1000);
      });
  };

  function getDate(num) {
    if (num === 0) return "Monday";
    else if (num === 1) return "Tuesday";
    else if (num === 2) return "Wednesday";
    else if (num === 3) return "Thursday";
    else if (num === 4) return "Friday";
    else if (num === 5) return "Saturday";
    else return "Sunday";
  }

  return (
    <div className={"personal-schedule-container"}>
      <PersonalSchedule user={currUser} />
      <br />
      <p style={{ color: "red" }}>{errMsg}</p>
      <p style={{ color: "green" }}>{msg}</p>
      <br />
      <ul>
        {currUser.registeredCourses.length === 0 &&
          currUser.scheduledAppointments.length === 0 && (
            <li className={"schedule-list-container"}>
              <p style={{ color: "red" }}>
                There is no courses or appointments!
              </p>
            </li>
          )}
        {currUser.registeredCourses.map((course) => {
          return (
            <li
              key={`course-${course.id}`}
              className={"schedule-list-container"}
            >
              <div className={"schedule-text"}>
                <h1>Course: {course.courseName}</h1>
                <h2 style={{ marginLeft: "10px" }}>
                  Instructor: {course.instructor.name}
                </h2>
              </div>
              {/* <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#4d1a7f" }}>
                  <b>{`${course.date} ${course.startTime}:00 -- ${course.endTime}:00`}</b>
                </span>
              </p> */}
              <button onClick={() => unregisterCourse(course.id)}>
                Cancel
              </button>
            </li>
          );
        })}
        {currUser.scheduledAppointments.map((appointment) => {
          return (
            <li
              key={`trainer-${appointment.trainerId}-${appointment.date}-${appointment.startTime}`}
              className={"schedule-list-container"}
            >
              <div className={"schedule-text"}>
                <h1>Appointment</h1>
                <h2 style={{ marginLeft: "10px" }}>
                  with {appointment.trainer.name}
                </h2>
              </div>
              <button
                onClick={() =>
                  cancelAppointment(
                    appointment.trainerId,
                    appointment.date,
                    appointment.startTime
                  )
                }
              >
                Cancel
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Schedule;
