import React from "react";
import "./error-icon.css";
import ErrorIconMaterial from "@material-ui/icons/Error";

export default class ErrorIcon extends React.Component {
  render() {
    return (
      <div className="failure">
        <ErrorIconMaterial />
      </div>
    );
  }
}
