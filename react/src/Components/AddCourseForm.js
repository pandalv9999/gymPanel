import React, { useEffect, useState } from "react";
import "./style/Form.css";
import axios from "axios";
import { useForm } from "react-hook-form";

const AddCourseForm = ({ user }) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const [trainers, setTrainers] = useState([]);
  const [errMsg, setErrMsg] = useState("");

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

  const onSubmit = (data) => {
    console.log(data);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    console.log(`Loading Trainers`);
    loadTrainer();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"add-form"}>
      <h3>Add Course</h3>
      <div className={"form-row"}>
        <label htmlFor="courseName">Course Name:</label>
        <input
          type="text"
          name="courseName"
          id="course-name"
          ref={register({ required: "Course Name required!" })}
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
        />
      </div>
      {errors.url && <p style={{ color: "red" }}>{errors.url.message}</p>}
      <div className={"form-row"}>
        <label htmlFor="date">Date: </label>
        <select name={"date"} id={"date"} ref={register}>
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
        <select name={"time"} id={"time"} ref={register}>
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
        />
      </div>
      {errors.capacity && (
        <p style={{ color: "red" }}>{errors.capacity.message}</p>
      )}
      <div className={"form-row"}>
        <label htmlFor={"instructor"}>Instructor</label>
        <select name={"instructor"} id={"instructor"} ref={register}>
          {trainers.map((trainer) => {
            return (
              <option key={trainer.id} value={trainer.id}>
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
        />
      </div>
      {errors.description && (
        <p style={{ color: "red" }}>{errors.description.message}</p>
      )}
      <div className={"button-row"}>
        <button type={"submit"} style={{ width: "100px" }}>
          Add
        </button>
      </div>
      <p style={{ color: "red" }}>{errMsg}</p>
    </form>
  );
};

export default AddCourseForm;
