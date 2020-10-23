import React, {useState} from "react";
import Schedule from "./Schedule";
import Profile from "./Profile";
import Courses from "./Courses";
import Trainers from "./Trainers";
import './style/Dashboard.css';

const Dashboard = ({user, userSetter}) => {

    const [currentModule, setCurrentModule] = useState("");
    const currentPage = "#";

    return (
        <React.Fragment>
            <aside className={"side-nav"}>
                <h2>Welcome<br/> {user.username}</h2>
                <ul className="list">
                    <li key="schedule" style={{listStyleType : "None"}}>
                        <a href={currentPage} className="App-link"
                           onClick={() => setCurrentModule(<Schedule user={user}/>)}>Schedule</a>
                    </li>
                    <li key="profile" style={{listStyleType : "None"}}>
                        <a href={currentPage} className="App-link"
                           onClick={() => setCurrentModule(<Profile user={user}/>)}>Profile</a>
                    </li>
                    <li key="courses" style={{listStyleType : "None"}}>
                        <a href={currentPage} className="App-link" onClick={() => setCurrentModule(<Courses user={user}/>)}>Courses</a>
                    </li>
                    <li key="trainers" style={{listStyleType : "None"}}>
                        <a href={currentPage} className="App-link" onClick={() => setCurrentModule(<Trainers user={user}/>)}>Trainers</a>
                    </li>
                    <li key="log-out" style={{listStyleType : "None"}}>
                        <a href={currentPage} className="App-link" onClick={() => {
                            userSetter(null);
                            console.log(`User ${user.username} log out success`);
                        }}>Log out</a>
                    </li>
                </ul>

            </aside>
            <div style={{paddingTop: "100px"}}>{currentModule}</div>
        </React.Fragment>

    )
};

export default Dashboard