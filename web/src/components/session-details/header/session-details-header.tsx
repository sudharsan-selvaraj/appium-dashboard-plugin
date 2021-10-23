import React from "react";
import "./session-details-header.css";
import FileCopy from "@material-ui/icons/FileCopy";
import { IconButton } from "@material-ui/core";
export default class SessionDetailsHeader extends React.Component {
  render() {
    return (
      <div className="session-details__header">
        <div className="session-details__header_column">
          {/* First column */}
          <div className="session-details__header_column_row">
            <div className="session-details__header_column_label">Session ID</div>
            <div className="session-details__header_column_value">100sdfsdfsdsdfsdfsdfsd00003030303030303</div>
          </div>
          <div className="session-details__header_column_row">
            <div className="session-details__header_column_label">OS</div>
            <div className="session-details__header_column_value">Android</div>
          </div>
          <div className="session-details__header_column_row">
            <div className="session-details__header_column_label">Platform Version</div>
            <div className="session-details__header_column_value">11.0</div>
          </div>
        </div>

        {/* Second column */}
        <div className="session-details__header_column">
          <div className="session-details__header_column_row">
            <div className="session-details__header_column_label">Device Name</div>
            <div className="session-details__header_column_value">emulator-5555</div>
          </div>
          <div className="session-details__header_column_row">
            <div className="session-details__header_column_label">UDID</div>
            <div className="session-details__header_column_value">a12f-1231-a322f-112cs</div>
          </div>
          <div className="session-details__header_column_row">
            <div className="session-details__header_column_label">Browser Name</div>
            <div className="session-details__header_column_value">Chrome</div>
          </div>
        </div>
      </div>
    );
  }
}
