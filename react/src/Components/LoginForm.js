import React, { useState } from "react";
import axios from "axios";
import "./style/LoginForm.css";

const LoginForm = ({ userSetter, registerSetter }) => {
  const [loginError, setLoginError] = useState("");

  const onLoginClicked = () => {
    const url = "./login";
    const body = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };
    axios
      .post(url, body)
      .then((res) => {
        console.log(`User ${res.data.username} Log in success!`);
        userSetter(res.data);
      })
      .catch((error) => {
        if (error.response.data) {
          setLoginError(error.response.data);
        } else {
          const msg = "Unexpected Exception occurs";
          console.log(msg);
          setLoginError(msg);
        }
      });
  };

  return (
    <div id="login-form">
      <input
        id="username"
        name="username"
        type="text"
        placeholder={"Username"}
      />
      <br />
      <br />
      <input
        id="password"
        name="password"
        type="password"
        placeholder={"Password"}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className={"button-placeholder"}>
          <button id="login-button" onClick={onLoginClicked}>
            Login
          </button>
          <button id="register-button" onClick={() => registerSetter(true)}>
            Register
          </button>
        </div>
      </div>
      <p id="login-error">{loginError}</p>
    </div>
  );
};

export default LoginForm;
