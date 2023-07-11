import React, { useState } from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(false);
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

  const handleRegistration = async () => {
    if (!username || !password || !name) {
      return;
    }

    try {
      let res = await fetch("/register", {
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
        // Handle registration error here
      }
    } catch (e) {
      console.log(e);
      // Handle registration error here
    }
  };

  return (
    <div className="registrationForm">
      {!registrationStatus ? (
        <>
          Register
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
          <SubmitButton
            text="Register"
            disabled={false}
            onClick={handleRegistration}
          />
          <SubmitButton
            text="Have an account? Login here"
            disabled={false}
            onClick={() => navigate("/login")}
          />
        </>
      ) : (
        <div>
          <p>Account successfully created!</p>
          <p>Please log in with your new credentials.</p>
          <SubmitButton
            text="Go to Login"
            disabled={false}
            onClick={() => navigate("/login")}
          />
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
