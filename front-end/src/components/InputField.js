import React from "react";

const InputField = (props) => {
  return (
    <div className="inputField">
      <input
        className="userInput"
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e)}
      />
    </div>
  );
};

export default InputField;
