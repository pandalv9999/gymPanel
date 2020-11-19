import React, { useState } from "react";
import "./style/EditProfile.css";

const EditProfile = ({ user }) => {
  const [firstname, setFirstName] = useState(user.firstName);
  const [lastname, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [weight, setWeight] = useState(user.weight);
  const [height, setHeight] = useState(user.height);

  const resetState = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPhone(user.phone);
    setWeight(user.weight);
    setHeight(user.height);
  };

  return (
    <div className={"edit-container"} style={{ marginTop: "100px" }}>
      <h2 className={"title-form"}>Edit Profile</h2>
      <form action="/edit/:username" method="POST" className={"edit-form"}>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            aria-label="username"
            className="form-control"
            name="username"
            id="username"
            value={user.username}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            aria-label="firstname"
            className="form-control"
            name="firstName"
            id="firstName"
            value={firstname}
            onChange={(evt) => setFirstName(evt.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name: </label>
          <input
            type="text"
            aria-label="lastname"
            className="form-control"
            name="lastName"
            id="lastName"
            value={lastname}
            onChange={(evt) => setLastName(evt.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            aria-label="email"
            className="form-control"
            name="email"
            id="email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone: </label>
          <input
            type="text"
            aria-label="phone"
            className="form-control"
            name="phone"
            id="phone"
            value={phone}
            pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
            onChange={(evt) => setPhone(evt.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender: </label>
          <input
            type="text"
            aria-label="gender"
            className="form-control"
            name="gender"
            id="DgenderOB"
            value={user.gender}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight(lbs): </label>
          <input
            type="number"
            aria-label="weight"
            className="form-control"
            name="weight"
            id="weight"
            value={weight}
            onChange={(evt) => setWeight(evt.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="height">Height(cm): </label>
          <input
            type="number"
            aria-label="height"
            className="form-control"
            name="height"
            id="height"
            value={height}
            onChange={(evt) => setHeight(evt.target.value)}
          />
        </div>
        <button className="btn btn-primary" id="update-button">
          Update
        </button>
      </form>
      <button
        className="btn btn-primary"
        id="reset-button"
        onClick={resetState}>
          Reset
      </button>
    </div>
  );
};
export default EditProfile;
