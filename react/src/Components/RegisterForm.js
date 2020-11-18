import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";

import "./style/RegisterForm.css";
import "react-datepicker/dist/react-datepicker.css";

// rewritten the code as react hook form
const RegisterFrom = () => {
  const [errMsg, setErrMsg] = useState("");
  const { register, handleSubmit, errors, watch } = useForm();
  const [startDate, setBirthdate] = useState(new Date());

  const onSubmit = (data) => {
    console.log(data);
    const url = "/create-data";
    axios
      .post(url, data)
      .then((res) => {
        console.log("Register Success");
        setErrMsg("Register Success");
      })
      .catch((error) => {
        if (error.response.data) {
          console.log(
            error.response.data.email || error.response.data.username
          );
          setErrMsg(error.response.data.email || error.response.data.username);
        } else {
          const msg = "Unexpected Exception occurs";
          console.log(msg);
          setErrMsg(msg);
        }
      });
  };

  return (
    <div className={"register-form"} style={{ marginBottom: "80px" }}>
      <h2 className={"title-form"}>Create Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={"register-form"}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="username"
            id="username"
            placeholder="Username"
            pattern="[A-Za-z0-9]{6,}"
            ref={register({ required: "Username required!" })}
          />
          {errors.username && (
            <p id="usernameError" style={{ color: "red" }}>
              {errors.username.message}
            </p>
          )}
          <small className="form-text text-muted">
            Please enter 6 or more characters (no special characters).
          </small>
        </div>
        <div className={"form-group"}>
          <input
            type={"password"}
            className={"form-control"}
            name={"password"}
            id={"password"}
            placeholder="Password"
            pattern=".{8,}"
            ref={register({ required: "Password required!" })}
          />
          <small className="form-text text-muted">
            Please enter 8 or more characters.
          </small>
        </div>
        {errors.password && (
          <p id="passwordError" style={{ color: "red" }}>
            {errors.password.message}
          </p>
        )}
        <div className={"form-group"}>
          <input
            type={"password"}
            className={"form-control"}
            name={"confirm_password"}
            id={"confirm-password"}
            placeholder="Confirm Password"
            pattern=".{8,}"
            ref={register({
              validate: (value) =>
                value === watch("password") || "Passwords does not match!",
            })}
          />
          {errors.confirm_password && (
            <p style={{ color: "red" }}>{errors.confirm_password.message}</p>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="firstName"
            id="firstName"
            placeholder="First Name"
            ref={register}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            ref={register}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            placeholder="Email"
            ref={register({ required: "Email required!" })}
          />
          {errors.email && (
            <p id="emailError" style={{ color: "red" }}>
              {errors.email.message}
            </p>
          )}
          <small className="form-text text-muted">
            Please enter a valid email address include an "@".
          </small>
        </div>
        <div className="form-group">
          <input
            type="tel"
            className="form-control"
            name="phone"
            id="phone"
            placeholder="Phone"
            ref={register}
            pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
          />
          <small className="form-text text-muted">
            Please enter a valid US phone number (123) 123-1234.
          </small>
        </div>
        <div className="form-group">
          <DatePicker
            id="date"
            selected={startDate}
            onChange={(date) => setBirthdate(date)}
            ref={register}
          />
          <small className="form-text text-muted">
            Please choose your Date Of Birth.
          </small>
        </div>
        <div className="form-group">
          <select
            id="gender"
            className="form-control"
            name="gender"
            defaultValue={"DEFAULT"}
            ref={register}
          >
            <option value="DEFAULT" disabled>
              Choose your gender ...
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            name="weight"
            id="weight"
            placeholder="Weight(lbs)"
            ref={register}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            name="height"
            id="height"
            placeholder="Height(cm)"
            ref={register}
          />
        </div>
        <button className="btn btn-primary" type={"submit"}>
          C R E A T E
        </button>
      </form>
      <p id="duplicatesError" style={{ color: "red" }}>
        {errMsg}
      </p>
      <a href="/">Already has an account? Log in</a>
    </div>
  );
};

export default RegisterFrom;
