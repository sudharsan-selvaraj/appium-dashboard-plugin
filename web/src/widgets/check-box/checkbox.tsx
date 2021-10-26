import React from "react";
import "./checkbox.css";

export default class CheckBox extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          checked={this.props.checked}
          onChange={(event) => this.props.onValueChanged(event.target.checked)}
        />
        <label className="checkbox-label" onClick={() => this.props.onValueChanged(!this.props.checked)}>
          {this.props.label}
        </label>
      </div>
    );
  }
}
