import React from "react";

//This file contains the component which
//handles user input in the authentication and
//registration.

const InputField = (props) => {
  return (
    <div className="input-field">
      <input
        className="user-input"
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e)}
      />
    </div>
  );
};

export default InputField;
