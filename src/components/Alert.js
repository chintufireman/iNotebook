import React from "react";

const Alert = (props) => {
  return (
    <div className="container">
      <div className="alert alert-success" role="alert">
       {props.message}
      </div>
    </div>
  );
};

export default Alert;
