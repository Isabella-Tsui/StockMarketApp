import React, { useState, useRef } from "react";
import InputField, { inputRef } from "./InputField";
import SubmitButton from "./SubmitButton";
import { useNavigate } from "react-router-dom";
import "./Authentication.css";
import config from "../config";

//This file contains the component that renders
//the login form

const LoginForm = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  /* 
  Function Name: handleUsernameChange, handlePasswordChange
  Purpose: Handle user input
  Parameters: e - user input
  */

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  /*
  Function Name: resetLoginForm
  Purpose: Reset the login form
  Parameters: None
  */

  const resetLoginForm = () => {
    setUsername("");
    setPassword("");
    setButtonDisabled(false);
  };

  /* 
  Function Name: doLogin
  Purpose: Handles authentication by ensuring
  the password and username are correct and if they are,
  navigates a user to the home page
  Parameters: None
  */

  const doLogin = async () => {
    if (!username || !password) return;
    setButtonDisabled(true);

    try {
      let res = await fetch(`${config.app.host}login`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      let result = await res.json();

      if (result && result.success) {
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("userID", result.username);
        setIsAuthenticated(true);
        navigate("/");
      } else if (result && result.success === false) {
        resetLoginForm();
        setLoginError(result.msg);
      }
    } catch (e) {
      resetLoginForm();
      setLoginError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="authentication-form-container">
      <div className="authentication-form">
        <label className="title-page">Welcome to MyStock</label>
        <label className="authentication-type">Login</label>
        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
          onEnter={doLogin}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          onEnter={doLogin}
        />
        {loginError && <div className="authentication-error">{loginError}</div>}
        <SubmitButton
          text="Login"
          disabled={buttonDisabled}
          onClick={doLogin}
        />
        <SubmitButton
          text="Don't have an account? Register here"
          disabled={buttonDisabled}
          onClick={() => navigate("/register")}
        />
      </div>
    </div>
  );
};

export default LoginForm;
