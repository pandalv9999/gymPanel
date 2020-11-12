import React from "react";
import AddCourseForm from "./AddCourseForm";
import AddTrainerForm from "./AddTrainerForm";

const AdminDashboard = ({user}) => {
  return (
    <ul>
      <li
        key={"addCourseFrom"}
        style={{ listStyleType: "None", flexDirection: "column" }}
        className={"list-container"}
      >
        <AddCourseForm user={user}/>
      </li>
      <li
        key={"addTrainerFrom"}
        style={{ listStyleType: "None"}}
        className={"list-container"}
      >
        <AddTrainerForm />
      </li>
    </ul>
  );
};

export default AdminDashboard;
