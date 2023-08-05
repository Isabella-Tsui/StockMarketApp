import React, { useState } from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import { useNavigate } from "react-router-dom";
import "./Authentication.css";

//This file contains the component that renders
//the login form

const LoginForm = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  // Function Name: handleUsernameChange, handlePasswordChange
  // Purpose: Handle user input
  // Parameters: e - user input

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Function Name: resetLoginForm
  // Purpose: Reset the login form
  // Parameters: None

  const resetLoginForm = () => {
    setUsername("");
    setPassword("");
    setButtonDisabled(false);
  };

  // Function Name: doLogin
  // Purpose: Handles authentication by ensuring
  //the password and username are correct and if they are
  //navigates a user to the home page
  // Parameters: None

  const doLogin = async () => {
    console.log(username);
    console.log(password);

    if (!username || !password) return;
    setButtonDisabled(true);

    try {
      let body = JSON.stringify({
        username: username,
        password: password,
      });

      let res = await fetch("http://localhost:4000/login", {
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
      console.log("result: ", { result });
      console.log("result.username: ", result.username);
      console.log("result.success: ", result.success);

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
      console.log(e);
      resetLoginForm();
      setLoginError("An error occurred. Please try again.");
    }
  };

  //Returns the login form

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
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
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
