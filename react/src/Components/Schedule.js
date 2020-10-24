import React from "react";

const Schedule = ({user}) => {

    return (
        <React.Fragment>
            <h2>Schedule of {user.username}</h2>
            <hr></hr>
            <ul>
                {user.registeredCourses.map(course => {
                    return (
                        <li key={course.courseId}>
                            <div className="container-fluid padding">
                                <div className="row padding">
                                    <div className="col-lg-6">

                                        {/* need courseName instead of courseId, but have issue add courseName into registeredCourses array  */}
                                        <h3>{course.courseId}</h3>
                                        <h4>{`${course.courseTime.date} ${course.courseTime.startTime}:00 -- ${course.courseTime.endTime}:00`}</h4>
                                        <br/>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
                {user.scheduledAppointments.map(appointment => {
                    return (
                        // does an appointment has id stored in database? temporarily use trainerId, but need change
                        <li key={appointment.trainerId}>
                            <div className="container-fluid padding">
                                <div className="row padding">
                                    <div className="col-lg-6">
                                        <h3>{appointment.trainerId}</h3>
                                        {/* appointment.date seems a number */}
                                        <h4>{`${appointment.date} ${appointment.startTime}:00 -- ${appointment.endTime}:00`}</h4>
                                        <br/>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </React.Fragment>
    )
};

export default Schedule