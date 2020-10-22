import React from "react";
import './style/Profile.css';

const Profile = ({user}) => {

    return (
        <div class="card">
          <h3>Profile of {user.username}</h3>
          <table class="table">
            <tr>
              <td>Name:</td>
              <td>{ user.firstName }</td>
            </tr>
            <tr>
              <td>Gender:</td>
              <td>{ user.gender }</td>
            </tr>
            <tr>
              <td>Weight:</td>
              <td>{ user.weight }</td>
            </tr>
            <tr>
              <td>Height:</td>
              <td>{ user.height }</td>
            </tr>
          </table>
        </div>
    )
};

export default Profile