import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./style/RegisterForm.css";

// rewritten the code as react hook form
const RegisterFrom = ({ setRegistering }) => {
  const [errMsg, setErrMsg] = useState("");
  const { register, handleSubmit, errors, watch } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const url = "/create-data";
    axios
        .post(url, data)
        .then((res) => {
            console.log("Register Success");
            setErrMsg("Register Success")
        })
        .catch((error) => {
          if (error.response.data) {
            console.log(error.response.data.email || error.response.data.username);
            setErrMsg(error.response.data.email || error.response.data.username);
          } else {
            const msg = "Unexpected Exception occurs";
            console.log(msg);
            setErrMsg(msg);
          }
        });
  };

  return (
    <div className={"register-form"} style={{ marginTop: "100px" }}>
      <h2 className={"title-form"}>Create Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={"register-form"}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            className="form-control"
            name="username"
            id="username"
            ref={register({required: "Username required!"})}
          />
          {errors.username && <p style={{color: "red"}}>{errors.username.message}</p>}
        </div>
        <div className={"form-group"}>
          <label htmlFor={"password"}>Password:</label>
          <input
            type={"password"}
            className={"form-control"}
            name={"password"}
            id={"password"}
            ref={register({required: "Password required!"})}
          />
        </div>
        {errors.password && <p style={{color: "red"}}>{errors.password.message}</p>}
        <div className={"form-group"}>
          <label htmlFor={"confirm_password"}>Confirm Password:</label>
          <input
            type={"password"}
            className={"form-control"}
            name={"confirm_password"}
            id={"confirm-password"}
            ref={register({
              validate: value => value === watch("password") || "Passwords does not match!"
            })}
          />
          {errors.confirm_password && <p style={{color: "red"}}>{errors.confirm_password.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            id="firstName"
            ref={register}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            id="lastName"
            ref={register}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" className="form-control" name="email" id="email" ref={register} />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input type="text" className="form-control" name="phone" id="phone" ref={register} />
        </div>
        <div className="form-group">
          <label htmlFor="birthDate">DOB(MM-DD-YYYY):</label>
          <input
            type="text"
            className="form-control"
            name="birthDate"
            id="birthDate"
            ref={register}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            className="form-control"
            name="gender"
            defaultValue={"DEFAULT"}
            ref={register}
          >
            <option value="DEFAULT" disabled>
              Choose an option ...
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight(lbs):</label>
          <input
            type="text"
            className="form-control"
            name="weight"
            id="weight"
            ref={register}
          />
        </div>
        <div className="form-group">
          <label htmlFor="height">Height(cm):</label>
          <input
            type="text"
            className="form-control"
            name="height"
            id="height"
            ref={register}
          />
        </div>
        <button className="btn btn-primary" type={"submit"}>Create</button>
        <button
          className="btn btn-primary"
          id={"back-button"}
          onClick={() => setRegistering(false)}
        >
          Login
        </button>
      </form>
      <p>{errMsg}</p>
    </div>
  );
};

export default RegisterFrom;
