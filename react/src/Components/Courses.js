/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style/Courses.css";

const Courses = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const loadCourse = () => {
    const url = `./${user.username}/courses`;
    axios
      .get(url)
      .then((res) => {
        const data = res.data;
        if (data.length === 0) {
          setErrMsg("There is no course loaded!");
        } else {
          setCourses(data);
        }
      })
      .catch((err) => {
        setErrMsg(err);
      });
  };

  const registerCourse = (courseId) => {
    const url = "./course";
    const data = {
      username: user.username,
      courseId: courseId,
    };
    axios
      .put(url, data)
      .then(() => {
        const msg = `${user.username} register course ${courseId} success!`;
        console.log(msg);
        document.getElementById(`err-${courseId}`).innerText = msg;
        document.getElementById(`err-${courseId}`).style.color = "green";
        loadCourse();
        setTimeout(
          () => (document.getElementById(`err-${courseId}`).innerText = ""),
          1000
        );
      })
      .catch(() => {
        const msg = `${user.username} register course ${courseId} fail!`;
        console.log(msg);
        document.getElementById(`err-${courseId}`).innerText = msg;
        document.getElementById(`err-${courseId}`).style.color = "red";
        setTimeout(
          () => (document.getElementById(`err-${courseId}`).innerText = ""),
          1000
        );
      });
  };

  const unregisterCourse = (courseId) => {
    const url = `./course/${user.username}/${courseId}`;
    axios
      .delete(url)
      .then(() => {
        const msg = `${user.username} unregister course ${courseId} success!`;
        console.log(msg);
        document.getElementById(`err-${courseId}`).innerText = msg;
        document.getElementById(`err-${courseId}`).style.color = "green";
        setTimeout(
          () => (document.getElementById(`err-${courseId}`).innerText = ""),
          1000
        );
        loadCourse();
      })
      .catch(() => {
        const msg = `${user.username} unregister course ${courseId} fail!`;
        console.log(msg);
        document.getElementById(`err-${courseId}`).innerText = msg;
        document.getElementById(`err-${courseId}`).style.color = "red";
        setTimeout(
          () => (document.getElementById(`err-${courseId}`).innerText = ""),
          1000
        );
      });
  };

  useEffect(() => {
    console.log(`Loading courses `);
    loadCourse();
  }, []);

  return (
    <React.Fragment>
      <p style={{ color: "red" }}>{errMsg}</p>
      <ul>
        {courses.map((course) => {
          return (
            <li
              key={course.id}
              style={{ listStyleType: "None" }}
              className={"list-container"}
            >
              <div className={"list-image"}>
                <img
                  src={course.url}
                  alt={course.courseName}
                  width={"120px"}
                  height={"120px"}
                />
              </div>
              <div className={"list-text"}>
                <h3>{course.courseName}</h3>
                <p>{course.description}</p>
                <p style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontStyle: "italic", color: "black" }}>
                    <b>{`${course.date} ${course.startTime}:00 -- ${course.endTime}:00`}</b>
                  </span>
                  <span id={`err-${course.id}`} style={{ color: "red" }} />
                </p>
              </div>
              <div className={"list-ops"}>
                <p>
                  <b>Instructor: </b>
                  <br /> {course.instructor.name}
                </p>
                <p>{`${course.enrolledMember.length}/${course.capacity} Enrolled`}</p>
                {!course.enrolledMember.includes(user.username) ? (
                  <button
                    onClick={() => registerCourse(course.id)}
                    disabled={course.enrolledMember.length === course.capacity}
                  >
                    Register
                  </button>
                ) : (
                  <button onClick={() => unregisterCourse(course.id)}>
                    Unregister
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default Courses;
