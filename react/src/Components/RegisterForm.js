import React, { useState } from "react";
import "./style/RegisterForm.css";

const RegisterFrom = ({ setRegistering }) => {
  const [errMsg, setErrMsg] = useState("");

  const register = () => {};

  return (
    <div className={"register-form"} style={{ marginTop: "100px" }}>
      <h2 className={"title-form"}>Create Account</h2>
      <form action="/create-data" method="POST" className={"register-form"}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            id="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            id="firstName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            id="lastName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" className="form-control" name="email" id="email" />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input type="text" className="form-control" name="phone" id="phone" />
        </div>
        <div className="form-group">
          <label htmlFor="birthDate">DOB(MM-DD-YYYY):</label>
          <input
            type="text"
            className="form-control"
            name="birthDate"
            id="birthDate"
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            className="form-control"
            name="gender"
            defaultValue={"DEFAULT"}
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
          />
        </div>
        <div className="form-group">
          <label htmlFor="height">Height(cm):</label>
          <input
            type="text"
            className="form-control"
            name="height"
            id="height"
          />
        </div>
        <button className="btn btn-primary">Create</button>
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
