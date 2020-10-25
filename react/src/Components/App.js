import React, {useState} from 'react';
import '../App.css';
import LoginForm from "./LoginForm";
import RegisterFrom from "./RegisterForm";
import Dashboard from "./Dashboard";

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState();
    const [registering, setRegistering] = useState(false);

    return (
        <div className="App">

            {!loggedInUser && !registering? <header className={"App-header-main"}>
                <div className={"header-container"} >
                    <h2>SF-GYM</h2>
                    <p>Welcome to SF-GYM Club</p>
                    <LoginForm userSetter={setLoggedInUser} registerSetter={setRegistering}/>
                </div>
            </header> : <header className={"App-header"}>
                <h2>SF-GYM</h2>
                <p>Welcome to SF-GYM Club</p>
            </header> }
            {loggedInUser && <Dashboard user={loggedInUser} userSetter={setLoggedInUser}/>}
            {registering && <RegisterFrom setRegistering={setRegistering}/>}

            {/*<header className={loggedInUser? "App-header" : "App-header-main"}>*/}
            {/*    <h2>SF-GYM</h2>*/}
            {/*    <p>Welcome to SF-GYM Club</p>*/}
            {/*</header>*/}
            {/*{loggedInUser ? <Dashboard user={loggedInUser} userSetter={setLoggedInUser}/> :*/}
            {/*    registering ? <RegisterFrom setRegistering={setRegistering}/> :*/}
            {/*        <LoginForm userSetter={setLoggedInUser} registerSetter={setRegistering}/>}*/}
        </div>
    );
};

export default App;
