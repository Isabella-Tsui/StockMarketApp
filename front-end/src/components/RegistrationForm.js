import React, { useState } from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import { useNavigate } from "react-router-dom";
import config from "../config";

//This file contains the registration component

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const navigate = useNavigate();

  // Function Name: handleUsernameChange, handlePasswordChange
  // handleNameChange
  // Purpose: Handle user input
  // Parameters: e - user input

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Function Name: resetRegistrationForm
  // Purpose: Clears the registration form
  // Parameters: None

  const resetRegistrationForm = () => {
    setUsername("");
    setPassword("");
    setName("");
    setButtonDisabled(false);
  };

  // Function Name: handleRegistration
  // Purpose: Store a users data
  // Parameters: None

  const handleRegistration = async () => {
    if (!username || !password || !name) return;
    setButtonDisabled(true);

    try {
      let res = await fetch(`${config.app.host}register`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          name: name,
        }),
      });

      let result = await res.json();

      if (result && result.success) {
        setRegistrationStatus(true);
      } else if (result && result.success === false) {
        resetRegistrationForm();
        setRegistrationError(result.msg);
      }
    } catch (e) {
      resetRegistrationForm();
      setRegistrationError("An error occured. Please try again.");
    }
  };

  //Returns the registration form, and if the registration was
  //sucessful, displays a message that tells the user the next
  //steps they should take if they want to use the app
  return (
    <div className="authentication-form-container">
      <div className="authentication-form">
        {!registrationStatus ? (
          <>
            <label className="title-page">Welcome to MyStock</label>
            <label className="authentication-type">Register an Account</label>
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
            <InputField
              type="text"
              placeholder="Preferred Name"
              value={name}
              onChange={handleNameChange}
            />
            {registrationError && (
              <div className="authentication-error">{registrationError}</div>
            )}
            <SubmitButton
              text="Register"
              disabled={buttonDisabled}
              onClick={handleRegistration}
            />
            <SubmitButton
              text="Have an account? Login here"
              disabled={buttonDisabled}
              onClick={() => navigate("/login")}
            />
          </>
        ) : (
          <div>
            <p className="user-msg">
              Account successfully created! Please log in with your new
              credentials.
            </p>
            <SubmitButton
              text="Login"
              disabled={false}
              onClick={() => navigate("/login")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
