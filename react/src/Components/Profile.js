import React, { useState } from "react";
import DisplayProfile from "./DisplayProfile";
import EditProfile from "./EditProfile";
import "./style/Profile.css";

const Profile = ({ user }) => {
  const [module, setModule] = useState(<DisplayProfile user={user} />);
  const [isDisplay, setState] = useState(true);

  const handleClick = (module) => {
    setState(false);
    setModule(module);
  };

  return (
    <div>
      {isDisplay ? (
        <div>
          <div style={{ paddingTop: "100px" }}>{module}</div>
          <button
            className="btn btn-primary"
            id="edit-button"
            onClick={() => handleClick(<EditProfile user={user} />)}
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <div>
          <div style={{ paddingTop: "100px" }}>{module}</div>
        </div>
      )}
    </div>
  );
};

export default Profile;
