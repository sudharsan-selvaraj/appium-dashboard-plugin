import React, { useEffect } from "react";
import SessionDetailsHeader from "./header/session-details-header";
import LeftDetailsContainer from "./left-container/left-container";
import "./session-details.css";
import SessionLogs from "./session-logs/session-logs";
import DeleteIcon from "@material-ui/icons/DeleteOutlineTwoTone";
import { ApiService } from "../../services/api";
import { Redirect } from "react-router";

export default class SessionDetails extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      deleted: false,
    };
  }

  deleteSession() {
    if (window.confirm("Are you sure you want to delete this session?")) {
      ApiService.deleteSessionById(this.props.session.session_id)
        .then((res) => {
          this.setState({ deleted: true });
        })
        .catch((err) => {});
    }
  }

  render() {
    if (this.state.deleted) {
      return <Redirect to="/" />;
    }

    if (this.props.session) {
      return (
        <div className="session-details__wrapper">
          <SessionDetailsHeader session={this.props.session} />
          <div className="session-details__action_container">
            <div className="session-details__action_items" onClick={this.deleteSession.bind(this)}>
              <DeleteIcon /> Delete session
            </div>
          </div>
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
