import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import "./style/RegisterForm.css";
import 'react-datepicker/dist/react-datepicker.css';

const RegisterFrom = ({ setRegistering }) => {
  const [errMsg] = useState("");
  const [startDate, setBirthdate] = useState(new Date());

  return (
    <div className={"register-form"} style={{ marginTop: "100px" }}>
      <h2 className={"title-form"} id="title">Create Account</h2>
      <form action="/create-data" method="POST" className={"register-form"}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            id="username"
            pattern="[A-Za-z0-9]{6,}" 
          />
          <small className="form-text text-muted">Please enter 6 or more characters (no special characters).</small>
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
          <input 
            type="email" 
            className="form-control" 
            name="email" 
            id="email"
          />
          <small className="form-text text-muted">Please enter a valid email address include an "@".</small>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input 
            type="tel" 
            className="form-control" 
            name="phone" 
            id="phone"
            pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
          />
          <small className="form-text text-muted">Please enter a valid US phone number (123) 123-1234.</small>
        </div>
        <div className="form-group">
          <label htmlFor="birthDate">DOB:</label>
          {/* <input
            type="text"
            className="form-control"
            name="birthDate"
            id="birthDate"
          /> */}
            <DatePicker 
              id="date"
              selected={startDate} 
              onChange={date => setBirthdate(date)} 
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
        {/* <button
          className="btn btn-primary"
          id={"back-button"}
          onClick={() => setRegistering(false)}
        >
          Login
        </button> */}
      </form>
      <a href="/">Already has an account? Login here</a>
      <p>{errMsg}</p>
    </div>
  );
};

export default RegisterFrom;
