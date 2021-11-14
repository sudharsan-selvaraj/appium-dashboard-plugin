import React from "react";
import SessionDetailsHeader from "./header/session-details-header";
import LeftDetailsContainer from "./left-container/left-container";
import "./session-details.css";
import SessionLogs from "./session-logs/session-logs";
import DeleteIcon from "@material-ui/icons/DeleteOutlineTwoTone";
import Spinner from "../../widgets/spinner/spinner";
import { RouteReactiveComponent } from "../route-reactive-component";
import ReactGA from "react-ga";
import SessionApi from "../../api/sessions";

export default class SessionDetails extends RouteReactiveComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      deleting: false,
    };
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  deleteSession() {
    if (window.confirm("Are you sure you want to delete this session?")) {
      this.setState({ deleting: true });
      SessionApi.deleteSessionById(this.props.session.session_id).then(() => {
        window.location.reload();
      });
    }
  }

  protected componentUpdated(): void {
    ReactGA.pageview(window.location.pathname + window.location.search);
    this.setState({ deleting: false });
  }

  render() {
    if (this.props.session) {
      return (
        <div className="session-details__wrapper">
          {this.props.session.is_completed && (
            <div className="session-details__action_container">
              <div className="session-details__action_name">
                {this.props.session.name || ""}
              </div>
              {this.state.deleting ? (
                <div className="session-details__action_items">
                  <Spinner /> Deleting..
                </div>
              ) : (
                <div
                  className="session-details__action_items"
                  onClick={this.deleteSession.bind(this)}
                >
                  <DeleteIcon /> Delete session
                </div>
              )}
            </div>
          )}
          <SessionDetailsHeader session={this.props.session} />
          {this.props.session.session_status_message && (
            <div
              className={`session-details__status_message_container ${
                this.props.session.is_test_passed ? "passed" : "failed"
              }`}
            >
              <span>Status reason:</span>
              <div className="session-details__status_message">
                {this.props.session.session_status_message}
              </div>
            </div>
          )}
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
