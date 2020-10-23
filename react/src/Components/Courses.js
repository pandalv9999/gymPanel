/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import axios from "axios";
import './style/Courses.css';

const Courses = ({user}) => {

    const[courses, setCourses] = useState([]);
    const[errMsg, setErrMsg] = useState("");

    const loadCourse = () => {
        const url = `./${user.username}/courses` ;
        axios.get(url).then(res => {
            const data = res.data;
            if (data.length === 0) {
                setErrMsg("There is no course loaded!")
            } else {
                setCourses(data)
            }
        }).catch(err => {
            setErrMsg(err)
        });
    };

    const registerCourse = (courseId) => {
        const url = "./course";
        const data = {
            username: user.username,
            courseId: courseId
        };
        axios.put(url, data).then(() => {
            const msg = `${user.username} register course ${courseId} success!`;
            console.log(msg);
            document.getElementById(`err-${courseId}`).innerText = msg;
            loadCourse();
            setTimeout(() => document.getElementById(`err-${courseId}`).innerText = "", 5000);
        }).catch(() => {
            const msg = `${user.username} register course ${courseId} fail!`;
            console.log(msg);
            document.getElementById(`err-${courseId}`).innerText = msg;
            setTimeout(() => document.getElementById(`err-${courseId}`).innerText = "", 5000);
        })
    };

    const unregisterCourse = (courseId) => {
        const url = `./course/${user.username}/${courseId}`;
        axios.delete(url).then(() => {
            const msg = `${user.username} unregister course ${courseId} success!`;
            console.log(msg);
            document.getElementById(`err-${courseId}`).innerText = msg;
            loadCourse();
            setTimeout(() => document.getElementById(`err-${courseId}`).innerText = "", 5000);
        }).catch(() => {
            const msg = `${user.username} unregister course ${courseId} fail!`;
            console.log(msg);
            document.getElementById(`err-${courseId}`).innerText = msg;
            setTimeout(() => document.getElementById(`err-${courseId}`).innerText = "", 5000);
        })
    };

    useEffect(() => {
        console.log(`Loading courses `);
        loadCourse();
    }, []);

    return (
        <React.Fragment>
            <h2>Courses</h2>
            <p style={{color: "red"}}>{errMsg}</p>
            <hr></hr>
            <ul>
                {courses.map(course => {
                    return (
                        // <li key={course.id} style={{listStyleType : "None"}}>
                        //     <h3>{course.courseName}</h3>
                        //     <h4>{`${course.date} ${course.startTime}:00 -- ${course.endTime}:00`}</h4>
                        //     <img src={course.url} alt={course.courseName} width={"150px"} height={"150px"}/>
                        //     <p>{course.description}</p>
                        //     <p>Instructor: {course.instructor}</p>
                        //     <p>{`${course.enrolledMember.length}/${course.capacity} Enrolled`}</p>
                        //     {!course.enrolledMember.includes(user.username) ?
                        //         <button onClick={() => registerCourse(course.id)}
                        //                 disabled={course.enrolledMember.length === course.capacity}>Register</button> :
                        //         <button onClick={() => unregisterCourse(course.id)}>Unregister</button>
                        //     }
                        //     <p id={`err-${course.id}`} style={{color: "red"}}/>
                        // </li>

                        <li key={course.id} style={{listStyleType : "None"}}>
                            <div className="container-fluid padding">
                                <div className="row padding">
                                    <div className="col-lg-6">
                                        <h3>{course.courseName}</h3>
                                        <h4>{`${course.date} ${course.startTime}:00 -- ${course.endTime}:00`}</h4>
                                        <br/>
                                        <img src={course.url} alt={course.courseName} width={"150px"} height={"150px"}/>
                                        <br/>
                                        <br/>
                                        <p>{course.description}</p>
                                        <br/>
                                        <p>Instructor: {course.instructor}</p>
                                        <p>{`${course.enrolledMember.length}/${course.capacity} Enrolled`}</p>
                                        {!course.enrolledMember.includes(user.username) ?
                                            <button className="btn btn-primary"
                                                    onClick={() => registerCourse(course.id)}
                                                    disabled={course.enrolledMember.length === course.capacity}>Register</button> :
                                            <button className="btn btn-primary"
                                                    onClick={() => unregisterCourse(course.id)}>Unregister</button>
                                        }
                                        <p id={`err-${course.id}`} style={{color: "red"}}/>
                                        <hr/>
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

export default Courses