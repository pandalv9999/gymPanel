import React, { useEffect, useState } from "react";
import AddCourseForm from "./AddCourseForm";
import AddTrainerForm from "./AddTrainerForm";
import axios from "axios";

const AdminDashboard = ({ user }) => {
  const [trainers, setTrainers] = useState([]);
  const [displayUpdateTrainer, setDisplayUpdateTrainer] = useState([]);
  const [courses, setCourses] = useState([]);
  const [displayUpdateCourse, setDisplayUpdateCourse] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  const refresh = () => {
    loadCourse();
    loadTrainer();
  };

  const loadTrainer = () => {
    const url = `./${user.username}/trainers`;
    axios
      .get(url)
      .then((res) => {
        const data = res.data;
        if (data.length === 0) {
          setErrMsg("There is no course loaded!");
        } else {
          setTrainers(data);
        }
      })
      .catch((err) => {
        setErrMsg(err);
      });
  };

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

  const onModifyCourseExpand = (courseId) => {
    const curr = [...displayUpdateCourse];
    curr[courseId] = true;
    setDisplayUpdateCourse(curr);
    console.log(curr[courseId]);
  };

  const onModifyCourseCollapse = (courseId) => {
    const curr = [...displayUpdateCourse];
    curr[courseId] = false;
    setDisplayUpdateCourse(curr);
  };

  const onModifyTrainerExpand = (trainerId) => {
    const curr = [...displayUpdateTrainer];
    curr[trainerId] = true;
    setDisplayUpdateTrainer(curr);
  };

  const onModifyTrainerCollapse = (trainerId) => {
    const curr = [...displayUpdateTrainer];
    curr[trainerId] = false;
    setDisplayUpdateTrainer(curr);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    console.log(`Loading Trainers`);
    loadTrainer();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    console.log(`Loading courses `);
    loadCourse();
  }, []);

  return (
    <React.Fragment>
      <div className={"personal-schedule-container"}>
        <p style={{ color: "red" }}>{errMsg}</p>
        <AddCourseForm trainers={trainers} course={null} />
        <ul>
          {courses.map((course) => {
            return (
              <React.Fragment>
                <li
                  className={"schedule-list-container"}
                  key={`course-${course.id}`}
                >
                  <div className={"schedule-text"}>
                    <h3>Course: {course.courseName}</h3>
                    <p style={{ marginLeft: "10px" }}>
                      Instructor: {course.instructor}
                    </p>
                  </div>
                  <p
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{ fontStyle: "italic" }}>
                      {`${course.date} ${course.startTime}:00 -- ${course.endTime}:00`}
                    </span>
                  </p>
                  {displayUpdateCourse[course.id] ? (
                    <button onClick={() => onModifyCourseCollapse(course.id)}>
                      Cancel
                    </button>
                  ) : (
                    <button onClick={() => onModifyCourseExpand(course.id)}>
                      Update
                    </button>
                  )}
                </li>
                {displayUpdateCourse[course.id] && (
                  <li key={`edit-course-${course.id}`}>
                    <AddCourseForm trainers={trainers} course={course} />
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ul>
      </div>
      <div className={"personal-schedule-container"}>
        <AddTrainerForm trainer={null} />
        <ul>
          {trainers.map((trainer) => {
            return (
              <React.Fragment>
                <li
                  className={"schedule-list-container"}
                  key={`trainer-${trainer.id}`}
                >
                  <div className={"schedule-text"}>
                    <h3>Trainer: {trainer.name}</h3>
                  </div>
                  {displayUpdateCourse[trainer.id] ? (
                    <button onClick={() => onModifyTrainerCollapse(trainer.id)}>
                      Cancel
                    </button>
                  ) : (
                    <button onClick={() => onModifyTrainerExpand(trainer.id)}>
                      Update
                    </button>
                  )}
                </li>
                {displayUpdateTrainer[trainer.id] && (
                  <li key={`edit-trainer-${trainer.id}`}>
                    <AddTrainerForm trainer={trainer} refresh={refresh} />
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default AdminDashboard;
