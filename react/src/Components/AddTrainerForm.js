import React, { useState } from "react";
import axios from "axios";
import "./style/Form.css";
import { useForm } from "react-hook-form";

const AddTrainerForm = ({ trainer, refresh, user }) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const [errMsg, setErrMsg] = useState("");

  const onSubmit = (data) => {
    data.user = user;
    if (!trainer) {
      insertTrainer(data);
    } else {
      updateTrainer(data);
    }
  };

  const updateTrainer = (data) => {
    const url = "/admin/trainer";
    data.id = trainer.id;
    axios
      .put(url, data)
      .then((res) => {
        console.log("Success to update trainer!");
        setErrMsg("Update Success!");
        refresh();
      })
      .catch((err) => {
        console.log("Fail to update trainer!");
        setErrMsg(err);
      });
  };

  const insertTrainer = (data) => {
    const url = "/admin/trainer";
    axios
      .post(url, data)
      .then((res) => {
        console.log("Success to insert trainer!");
        setErrMsg("Insert Success!");
        refresh();
      })
      .catch((err) => {
        console.log("Fail to insert trainer!");
        setErrMsg(err);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"add-form"}>
      <h3>{trainer ? "Update" : "Add"} Trainer</h3>
      <div className={"form-row"}>
        <label htmlFor="name">Trainer Name:</label>
        <input
          type="text"
          aria-label="name"
          name="name"
          id="name"
          ref={register({ required: "Trainer Name required!" })}
          defaultValue={trainer ? trainer.name : ""}
        />
      </div>
      {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      <div className={"form-row"}>
        <label htmlFor="url">Image url:</label>
        <input
          type="text"
          aria-label="url"
          name="url"
          id="trainer-url"
          ref={register({ required: "Image url required!" })}
          defaultValue={trainer ? trainer.url : ""}
        />
      </div>
      {errors.url && <p style={{ color: "red" }}>{errors.url.message}</p>}

      <div className={"form-row"}>
        <label htmlFor={"description"}>Description:</label>
        <textarea
          id={"trainer-description"}
          aria-label="description"
          name={"description"}
          ref={register({ required: "Description must not be empty!" })}
          rows={5}
          placeholder={" Please enter description to the trainer!"}
          defaultValue={trainer ? trainer.description : ""}
        />
      </div>
      {errors.description && (
        <p style={{ color: "red" }}>{errors.description.message}</p>
      )}
      <div className={"button-row"}>
        <button type={"submit"} style={{ width: "100px" }}>
          {trainer ? "Update" : "Add"}
        </button>
      </div>
      <div className={"form-row"}>
        <p style={{ color: "red" }}>{errMsg}</p>
      </div>
    </form>
  );
};

export default AddTrainerForm;
