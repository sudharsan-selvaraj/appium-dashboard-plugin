import React from "react";
import "./session-filter.css";
import SearchIcon from "@material-ui/icons/Search";
import { FormControl, MenuItem, Select } from "@material-ui/core";

export default class SessionFilter extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      filter: {
        ...props.filter,
      },
    };
  }

  onOSChanged(event: any) {
    this.setState({
      filter: {
        ...this.state.filter,
        os: event.target.value == "none" ? "" : event.target.value,
      },
    });
  }

  onStatusChanged(event: any) {
    this.setState({
      filter: {
        ...this.state.filter,
        status: event.target.value == "none" ? "" : event.target.value,
      },
    });
  }

  onNameChanged(event: any) {
    this.setState({
      filter: {
        ...this.state.filter,
        name: event.target.value,
      },
    });
  }

  onDeviceUDIDChanged(event: any) {
    this.setState({
      filter: {
        ...this.state.filter,
        device_udid: event.target.value,
      },
    });
  }

  applyFilter() {
    this.props.onFilterApplied(this.state.filter);
  }

  clearFilter() {
    this.props.onFilterApplied({
      name: "",
      os: "",
      status: "",
    });
  }

  render() {
    return (
      <div className="session-list__filter_wrapper">
        <div className="session-list__filter_row">
          <div className="session-list__filter_row_label">Session ID:</div>
          <input
            className="session-list__filter_row_input"
            placeholder="Search for session id or name"
            defaultValue={this.state.filter.name}
            onChange={this.onNameChanged.bind(this)}
          />
        </div>
        <div className="session-list__filter_row session-list__os_filter">
          <div className="session-list__filter_row_label">Platform:</div>
          <FormControl className="filter-dropdown">
            <Select
              id="platform-filter-select"
              value={this.state.filter.os == "" ? "none" : this.state.filter.os}
              label="PLatform"
              onChange={this.onOSChanged.bind(this)}
            >
              <MenuItem value={"none"}>All</MenuItem>
              <MenuItem value={"ios"}>IOS</MenuItem>
              <MenuItem value={"android"}>Android</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="session-list__filter_row session-list__status_filter">
          <div className="session-list__filter_row_label">Status:</div>
          <FormControl className="filter-dropdown">
            <Select
              id="status-filter-select"
              value={this.state.filter.status == "" ? "none" : this.state.filter.status}
              label="Satus"
              onChange={this.onStatusChanged.bind(this)}
            >
              <MenuItem value={"none"}>All</MenuItem>
              <MenuItem value={"running"}>RUNNING</MenuItem>
              <MenuItem value={"passed"}>PASSED</MenuItem>
              <MenuItem value={"failed"}>FAILED</MenuItem>
              <MenuItem value={"timeout"}>TIMEOUT</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="session-list__filter_row session-list__device_filter">
          <div className="session-list__filter_row_label">UDID:</div>
          <input
            className="session-list__filter_row_input"
            placeholder="Search with device UDID"
            defaultValue={this.state.filter.device_udid}
            onChange={this.onDeviceUDIDChanged.bind(this)}
          />
        </div>
        <div className="session-list__filter_row apply-filter-button">
          <button onClick={() => this.clearFilter()}>Clear</button>
          <button onClick={() => this.applyFilter()}>Apply</button>
        </div>
      </div>
    );
  }
}
