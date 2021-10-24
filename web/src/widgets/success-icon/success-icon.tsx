import React from "react";
import "./success-icon.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

export default class SuccessIcon extends React.Component {
  render() {
    return (
      <div className="success">
        <CheckCircleIcon />
      </div>
    );
  }
}
