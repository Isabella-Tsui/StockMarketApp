import React from "react";

const SubmitButton = (props) => {
  return (
    <div className="submitButton">
      <button
        className="genericButton"
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {props.text}
      </button>
    </div>
  );
};

export default SubmitButton;
