import React, { useEffect } from "react";
import SessionDetailsHeader from "./header/session-details-header";
import LeftDetailsContainer from "./left-container/left-container";
import "./session-details.css";
import SessionLogs from "./session-logs/session-logs";

export default class SessionDetails extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    if (this.props.session) {
      return (
        <div className="session-details__wrapper">
          <SessionDetailsHeader session={this.props.session} />
          <div className="session-details__main_content">
            <LeftDetailsContainer session={this.props.session} />
            <SessionLogs session={this.props.session} />
          </div>
        </div>
      );
    } else {
      return <div className="session-details__wrapper"></div>;
    }
  }
}
