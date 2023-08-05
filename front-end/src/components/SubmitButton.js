import React from "react";

//This file contains the component that
//handles the submits

const SubmitButton = (props) => {
  return (
    <div className="submit-button">
      <button
        className="generic-button"
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {props.text}
      </button>
    </div>
  );
};

export default SubmitButton;
