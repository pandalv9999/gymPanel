import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

import "./style/RegisterForm.css";

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
    <div className={"register-form"} style={{ marginBottom: "180px" }}>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={"register-form"}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="username"
            id="username"
            aria-label="Username"
            placeholder="Username (6 or more characters)"
            pattern="[A-Za-z0-9]{6,}"
            ref={register({ required: "Username required!" })}
          />
          {errors.username && (
            <p id="usernameError" style={{ color: "red" }}>
              {errors.username.message}
            </p>
          )}
        </div>
        <div className={"form-group"}>
          <input
            type={"password"}
            className={"form-control"}
            name={"password"}
            id={"password"}
            aria-label="Password"
            placeholder="Password (8 or more characters)"
            pattern=".{8,}"
            ref={register({ required: "Password required!" })}
          />
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
            aria-label="confirm-password"
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
            aria-label="First Name"
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
            aria-label="Last Name"
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
            aria-label="Email"
            placeholder="Email"
            ref={register({ required: "Email required!" })}
          />
          {errors.email && (
            <p id="emailError" style={{ color: "red" }}>
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="form-group">
          <input
            type="tel"
            className="form-control"
            name="phone"
            id="phone"
            aria-label="Phone"
            placeholder="Phone"
            ref={register}
            pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
          />
        </div>
        <div className="form-group">
          <select
            id="gender"
            aria-label="gender"
            className="form-control"
            name="gender"
            defaultValue={"DEFAULT"}
            ref={register}
          >
            <option aria-label="Choose your gender ..." value="DEFAULT" disabled>
              Choose your gender ...
            </option>
            <option aria-label="Male" value="Male">Male</option>
            <option aria-label="Female" value="Female">Female</option>
            <option aria-label="Prefer not to say" value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            name="weight"
            id="weight"
            aria-label="Weight(lbs)"
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
            aria-label="Height(cm)"
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
