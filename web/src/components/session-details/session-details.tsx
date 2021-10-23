import React from "react";
import SessionDetailsHeader from "./header/session-details-header";
import LeftDetailsContainer from "./left-container/left-container";
import "./session-details.css";
export default class SessionDetails extends React.Component {
  render() {
    return (
      <div className="session-details__wrapper">
        <SessionDetailsHeader />
        <div className="session-details__main_content">
          <LeftDetailsContainer />
        </div>
      </div>
    );
  }
}
