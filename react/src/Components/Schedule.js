import React, {useEffect, useState} from "react";
import PersonalSchedule from "./PersonalSchedule";
import './style/Schedule.css';
import axios from "axios";

const Schedule = ({user}) => {

    // since each time we update the schedule, we have to load user again
    const [currUser, setCurrUser] = useState(user);

    useEffect(() => {
        console.log("loading curr");
        getCurrentUser();
    },[]);

    const getCurrentUser = () => {
        const url = "./" + user.username;
        axios.get(url).then(res => {
            setCurrUser(res.data)
        }).catch(err => {
            console.log("error");
        });
    };

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
            <PersonalSchedule user={currUser}/>
            <ul>
                {currUser.registeredCourses.map(course => {
                    return (
                        <li key={`course-${course.courseId}`} className={"list-container"}>
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
                {currUser.scheduledAppointments.map(appointment => {
                    return (
                        <li key={`trainer-${appointment.trainerId}`} className={"list-container"}>
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