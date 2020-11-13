import React from "react";
import "./style/Form.css";
import { useForm } from "react-hook-form";

const AddTrainerForm = ({ trainer }) => {
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"add-form"}>
      <h3>{trainer ? "Update" : "Add"} Trainer</h3>
      <div className={"form-row"}>
        <label htmlFor="name">Trainer Name:</label>
        <input
          type="text"
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
          Add
        </button>
      </div>
    </form>
  );
};

export default AddTrainerForm;
