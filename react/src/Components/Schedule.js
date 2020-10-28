import React from "react";
import './style/Schedule.css';

const Schedule = ({user}) => {

    function getDate(num) {
        if (num === 1) return "Monday";
        else if (num === 2) return "Tuesday";
        else if (num === 3) return "Wednesday";
        else if (num === 4) return "Thursday";
        else if (num === 5) return "Friday";
        else if (num === 6) return "Saturday";
        else return "Sunday";
    }

    return (
        <React.Fragment>
            <hr></hr>
            <ul>
                {user.registeredCourses.map(course => {
                    return (
                        <li key={course._id} className={"schedule-container"}>
                        <div className={"schedule-text"}>
                            <h3>{course.courseName}</h3>
                            <p>Instructor: {course.instructor}</p>
                            <p style={{display: "flex", justifyContent: "space-between"}}>
                                <span style={{fontStyle: "italic", color:"#61dafb"}}>
                                    {`${course.date} ${course.startTime}:00 -- ${course.endTime}:00`}
                                </span>
                            </p>
                        </div>
                        </li>
                    );
                })}
            </ul>
            <br></br>
            <ul>
                {user.scheduledAppointments.map(appointment => {
                    return (
                        <li key={appointment._id} className={"schedule-container"}>
                        <div className={"schedule-text"}>
                            <h3>Appointment</h3>
                            <p style={{display: "flex", justifyContent: "space-between"}}>
                                <span style={{fontStyle: "italic", color:"#61dafb"}}>
                                    {`${getDate(appointment.date)} ${appointment.startTime}:00 -- ${appointment.endTime}:00`}
                                </span>
                            </p>
                        </div>
                        </li>
                    );
                })}
            </ul>
        </React.Fragment>
    )
};

export default Schedule