import React, {useState} from "react";
import axios from 'axios';

const LoginForm = ({userSetter, registerSetter}) => {

    const [loginError, setLoginError] = useState("");

    const onLoginClicked = () => {
        const url = "./" + document.getElementById("username").value;
        axios.get(url).then(res => {
            console.log(`User ${res.data.username} Log in success!`);
            userSetter(res.data)
        }).catch(err => {
            console.log("error");
            setLoginError(err.response.data)
         });
    };

    return (
        <div id="login-form">
            <label htmlFor="username">Username:</label>
            <input id="username" name="username" type="text"/>
            <button id="login-button" onClick={onLoginClicked}>Login</button>
            <button id="register-button" onClick={() => registerSetter(true)}>Register</button>
            <p id="login-error">{loginError}</p>
        </div>

    )
};

export default LoginForm