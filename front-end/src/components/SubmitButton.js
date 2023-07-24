import React from "react";

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
