import React, { useState } from "react";
import "../App.css";
import LoginForm from "./LoginForm";
import RegisterFrom from "./RegisterForm";
import Dashboard from "./Dashboard";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState();
  const [registering, setRegistering] = useState(false);

  const setHeader = () => {
    let header;

    if (!loggedInUser && !registering) {
      header = (
        <header className={"App-header-main"}>
          <div className={"header-container"}>
            <h2>SF-GYM</h2>
            <p>Welcome to SF-GYM Club</p>
            <p>A online application developed for a gym for its user to make appointments online.</p>
            <LoginForm
              userSetter={setLoggedInUser}
              registerSetter={setRegistering}
            />
          </div>
        </header>
      );
    } else if (registering) {
      header = null;
    } else {
      header = (
        <header className={"App-header"}>
          <h2>SF-GYM</h2>
          <p>Welcome to SF-GYM Club</p>
        </header>
      );
    }
    return header;
  };

  return (
    <div className={"App"}>
      {setHeader()}
      {loggedInUser && (
        <Dashboard user={loggedInUser} />
      )}
      {registering && <RegisterFrom setRegistering={setRegistering} />}
    </div>
  );
};

export default App;
