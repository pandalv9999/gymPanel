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
            <header className="App-header">
                <h2>Hello World</h2>
                <p>Here is a sample Header and should be Replace by a actual header</p>
            </header>
            {loggedInUser ? <Dashboard user={loggedInUser} userSetter={setLoggedInUser}/> :
                registering ? <RegisterFrom setRegistering={setRegistering}/> :
                    <LoginForm userSetter={setLoggedInUser} registerSetter={setRegistering}/>}
        </div>
    );
};

export default App;
