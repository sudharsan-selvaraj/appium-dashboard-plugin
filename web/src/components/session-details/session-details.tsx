import React from "react";
import CapabilitiesContainer from "./left-container/left-container";
import "./session-details.css";
export default class SessionDetails extends React.Component {
  render() {
    return (
      <div className="session-details__wrapper">
        <div className="session-details__header">
          <div className="session-details__column">
            <div className="session-details__column_row">
              <div className="session-details__column_header">SESSION ID</div>
              <div className="session-details__column_value">100sdfsdfsdsdfsdfsdfsd00003030303030303</div>
            </div>
            <div className="session-details__column_row">
              <div className="session-details__column_header">START TIME</div>
              <div className="session-details__column_value">100sdfsdfsdsdfsdfsdfsd00003030303030303</div>
            </div>
            <div className="session-details__column_row">
              <div className="session-details__column_header">START TIME</div>
              <div className="session-details__column_value">100sdfsdfsdsdfsdfsdfsd00003030303030303</div>
            </div>
          </div>
          <div className="session-details__column">
            <div className="session-details__column_row">
              <div className="session-details__column_header">SESSION ID</div>
              <div className="session-details__column_value">100sdfsdfsdsdfsdfsdfsd00003030303030303</div>
            </div>
            <div className="session-details__column_row">
              <div className="session-details__column_header">START TIME</div>
              <div className="session-details__column_value">100sdfsdfsdsdfsdfsdfsd00003030303030303</div>
            </div>
            <div className="session-details__column_row">
              <div className="session-details__column_header">START TIME</div>
              <div className="session-details__column_value">100sdfsdfsdsdfsdfsdfsd00003030303030303</div>
            </div>
          </div>
          <div className="session-details__column">
            <div className="session-details__column_row">
              <div className="session-details__column_header">SESSION ID</div>
              <div className="session-details__column_value">100sdfsdfsdsdfsdfsdfsd00003030303030303</div>
            </div>
            <div className="session-details__column_row">
              <div className="session-details__column_header">START TIME</div>
              <div className="session-details__column_value">100sdfsdfsdsdfsdfsdfsd00003030303030303</div>
            </div>
            <div className="session-details__column_row">
              <div className="session-details__column_header">START TIME</div>
              <div className="session-details__column_value">100sdfsdfsdsdfsdfsdfsd00003030303030303</div>
            </div>
          </div>
        </div>
        <div className="session-details__main_content">
          <CapabilitiesContainer />
        </div>
      </div>
    );
  }
}
