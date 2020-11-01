import React from "react";
import "./style/DisplayProfile.css";

const DisplayProfile = ({ user }) => {
  return (
    <div className="card">
      <h3>Profile of {user.username}</h3>
      <table className="table">
        <tbody>
          <tr>
            <th scope="row">First Name:</th>
            <td>{user.firstName}</td>
          </tr>
          <tr>
            <th scope="row">Last Name:</th>
            <td>{user.lastName}</td>
          </tr>
          <tr>
            <th scope="row">Gender:</th>
            <td>{user.gender}</td>
          </tr>
          <tr>
            <th scope="row">Weight:</th>
            <td>{user.weight}</td>
          </tr>
          <tr>
            <th scope="row">Height</th>
            <td>{user.height}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default DisplayProfile;
