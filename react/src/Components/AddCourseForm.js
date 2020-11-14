import React, { useEffect, useState } from "react";
import "./style/Form.css";
import axios from "axios";
import { useForm } from "react-hook-form";

const AddCourseForm = ({ trainers, course, user, refresh }) => {
  const { register, handleSubmit, errors, reset } = useForm();
    const [errMsg, setErrMsg] = useState("");

  // assign id to data
  const onSubmit = (data) => {
    data.user = user;
    if (course) {
        updateCourse(data);
    } else {
        insertCourse(data);
    }
  };

  const updateCourse = (data) => {
      data.id = course.id;
      data.prevCourse = course;
      console.log(data);
      const url = "/admin/course";
      axios.put(url, data).then((result) => {
        console.log("Successfully modify course info");
        setErrMsg("Successfully modify course info");
        refresh()
      }).catch((err) => {
          setErrMsg(err);
      });
  };

  const findTrainerById = (trainerId) => {
      for (const trainer of trainers) {
          if (trainer.id === trainerId) {
              return trainer;
          }
      }
      return null;
    };

  const insertCourse = (data) => {
      data.instructor = findTrainerById(parseInt(data.instructor));
        const url = "/admin/course";
        axios.post(url, data).then((result) => {
            console.log("Successfully add course");
            setErrMsg("Successfully add course");
            refresh()
        }).catch((err) => {
            setErrMsg(err)
        })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"add-form"}>
      <h3>{course ? "Update" : "Add"} Course</h3>
      <div className={"form-row"}>
        <label htmlFor="courseName">Course Name:</label>
        <input
          type="text"
          name="courseName"
          id="course-name"
          ref={register({ required: "Course Name required!" })}
          defaultValue={course ? course.courseName : ""}
        />
      </div>
      {errors.courseName && (
        <p style={{ color: "red" }}>{errors.courseName.message}</p>
      )}
      <div className={"form-row"}>
        <label htmlFor="url">Image url:</label>
        <input
          type="text"
          name="url"
          id="url"
          ref={register({ required: "Image url required!" })}
          defaultValue={course ? course.url : ""}
        />
      </div>
      {errors.url && <p style={{ color: "red" }}>{errors.url.message}</p>}
      <div className={"form-row"}>
        <label htmlFor="date">Date: </label>
        <select
          name={"date"}
          id={"date"}
          ref={register}
          defaultValue={course ? course.date : "Monday"}
        >
          <option value={"Monday"}>Monday</option>
          <option value={"Tuesday"}>Tuesday</option>
          <option value={"Wednesday"}>Wednesday</option>
          <option value={"Thursday"}>Thursday</option>
          <option value={"Friday"}>Friday</option>
          <option value={"Saturday"}>Saturday</option>
          <option value={"Sunday"}>Sunday</option>
        </select>
      </div>
      <div className={"form-row"}>
        <label htmlFor={"time"}>Time: </label>
        <select
          name={"time"}
          id={"time"}
          ref={register}
          defaultValue={
            course ? `${course.startTime}-${course.endTime}` : "8-9"
          }
        >
          <option key={"8-9"} value={"8-9"}>
            8:00 -- 9:00
          </option>
          <option key={"9-10"} value={"9-10"}>
            9:00 -- 10:00
          </option>
          <option key={"10-11"} value={"10-11"}>
            10:00 -- 11:00
          </option>
          <option key={"11-12"} value={"11-12"}>
            11:00 -- 12:00
          </option>
          <option key={"12-13"} value={"12-13"}>
            12:00 -- 13:00
          </option>
          <option key={"13-14"} value={"13-14"}>
            13:00 -- 14:00
          </option>
          <option key={"14-15"} value={"14-15"}>
            14:00 -- 15:00
          </option>
          <option key={"15-16"} value={"15-16"}>
            15:00 -- 16:00
          </option>
          <option key={"16-17"} value={"16-17"}>
            16:00 -- 17:00
          </option>
          <option key={"17-18"} value={"17-18"}>
            17:00 -- 18:00
          </option>
          <option key={"18-19"} value={"18-19"}>
            18:00 -- 19:00
          </option>
          <option key={"19-20"} value={"19-20"}>
            19:00 -- 20:00
          </option>
        </select>
      </div>
      <div className={"form-row"}>
        <label htmlFor={"capacity"}>Capacity: </label>
        <input
          type={"number"}
          name={"capacity"}
          id={"capacity"}
          ref={register({
            validate: (value) => value >= 0 || "Minimum Capacity is 0!",
            required: "Capacity must not be empty!",
          })}
          defaultValue={course ? course.capacity : ""}
        />
      </div>
      {errors.capacity && (
        <p style={{ color: "red" }}>{errors.capacity.message}</p>
      )}
      <div className={"form-row"}>
        <label htmlFor={"instructor"}>Instructor</label>
        <select
          name={"instructor"}
          id={"instructor"}
          ref={register}
          defaultValue={
            course
              ? course.instructor
              : trainers.length !== 0
              ? trainers[0].name
              : ""
          }
        >
          {trainers.map((trainer) => {
            return (
              <option key={`trainer-detail-${trainer.id}`} value={trainer.id}>
                {trainer.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className={"form-row"}>
        <label htmlFor={"description"}>Description:</label>
        <textarea
          id={"description"}
          name={"description"}
          ref={register({ required: "Description must not be empty!" })}
          rows={5}
          placeholder={" Please enter description to the course!"}
          defaultValue={course ? course.description : ""}
        />
      </div>
      {errors.description && (
        <p style={{ color: "red" }}>{errors.description.message}</p>
      )}
      <div className={"button-row"}>
        <button type={"submit"} style={{ width: "100px" }}>
            {course ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default AddCourseForm;
