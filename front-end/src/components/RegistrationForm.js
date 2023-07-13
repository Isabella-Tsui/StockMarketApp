import React, { useState } from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const resetRegistrationForm = () => {
    setUsername("");
    setPassword("");
    setName("");
    setButtonDisabled(false);
  };

  const handleRegistration = async () => {
    if (!username || !password || !name) return;
    setButtonDisabled(true);
    console.log("1");

    try {
      console.log("2");
      let body = JSON.stringify({
        username: username,
        password: password,
        name: name,
      });
      console.log("3");

      let res = await fetch("http://localhost:4000/register", {
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

      console.log("4");

      let result = await res.json();
      console.log("result: ", { result });
      console.log("result.username: ", result.username);
      console.log("result.password: ", result.passsword);
      console.log("result.name: ", result.name);
      console.log("result.success: ", result.success);

      console.log("5");

      if (result && result.success) {
        setRegistrationStatus(true);
        console.log("6");
      } else if (result && result.success === false) {
        resetRegistrationForm();
        setRegistrationError(result.msg);
        console.log("7");
      }
    } catch (e) {
      console.log("8");
      console.log(e);
      resetRegistrationForm();
      setRegistrationError("An error occured. Please try again.");
    }
  };

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
