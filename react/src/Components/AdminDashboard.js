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

  const deleteTrainer = (trainer) => {
    const url = "admin/trainer/delete";
    trainer.user = user;
    axios
      .post(url, trainer)
      .then((res) => {
        console.log(`Successfully remove trainer ${trainer.id}`);
        setErrMsg(`Successfully remove trainer ${trainer.id}`);
        refresh();
      })
      .catch((err) => {
        setErrMsg(err);
      });
  };

  const deleteCourse = (course) => {
    const url = "admin/course/delete";
    course.user = user;
    axios
      .post(url, course)
      .then((res) => {
        console.log(`Successfully remove trainer ${course.id}`);
        setErrMsg(`Successfully remove trainer ${course.id}`);
        refresh();
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

  const generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime() }`;
  }

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
        <AddCourseForm
          trainers={trainers}
          course={null}
          user={user}
          refresh={refresh}
        />
        <ul>
          {courses.map((course) => {
            return (
              <React.Fragment key={ generateKey(course.id) }>
                <li
                  className={"schedule-list-container"}
                  key={`course-list-${course.id}-${Math.random() * 10000}`}
                >
                  <div className={"schedule-text"}>
                    <h4>Course: {course.courseName}</h4>
                    <p style={{ marginLeft: "10px" }}>
                      <b>Instructor: {course.instructor.name}</b>
                    </p>
                  </div>
                  <div style={{ display: "flex" }}>
                    <button
                      style={{ marginRight: "20px" }}
                      onClick={() => deleteCourse(course)}
                    >
                      Remove
                    </button>
                    {displayUpdateCourse[course.id] ? (
                      <button onClick={() => onModifyCourseCollapse(course.id)}>
                        Cancel
                      </button>
                    ) : (
                      <button onClick={() => onModifyCourseExpand(course.id)}>
                        Update
                      </button>
                    )}
                  </div>
                </li>
                {displayUpdateCourse[course.id] && (
                  <AddCourseForm
                    trainers={trainers}
                    course={course}
                    user={user}
                    refresh={refresh}
                  />
                )}
              </React.Fragment>
            );
          })}
        </ul>
      </div>
      <div className={"personal-schedule-container"}>
        <p style={{ color: "red" }}>{errMsg}</p>
        <AddTrainerForm trainer={null} refresh={refresh} user={user} />
        <ul>
          {trainers.map((trainer) => {
            return (
              <React.Fragment key={ generateKey(trainer.id) }>
                <li
                  className={"schedule-list-container"}
                  key={`trainer-list-${trainer.id}-${Math.random() * 10000}`}
                >
                  <div className={"schedule-text"}>
                    <h4>Trainer: {trainer.name}</h4>
                  </div>
                  <div style={{ display: "flex" }}>
                    <button
                      style={{ marginRight: "20px" }}
                      onClick={() => deleteTrainer(trainer)}
                    >
                      Remove
                    </button>
                    {displayUpdateTrainer[trainer.id] ? (
                      <button
                        onClick={() => onModifyTrainerCollapse(trainer.id)}
                      >
                        Cancel
                      </button>
                    ) : (
                      <button onClick={() => onModifyTrainerExpand(trainer.id)}>
                        Update
                      </button>
                    )}
                  </div>
                </li>
                {displayUpdateTrainer[trainer.id] && (
                  <AddTrainerForm
                    trainer={trainer}
                    refresh={refresh}
                    user={user}
                  />
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
