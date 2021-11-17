import React from "react";
import styled from "styled-components";
import SessionApi from "../../../../api/sessions";
import CheckBox from "../../../../widgets/check-box/checkbox";
import LogEntry from "../../../../widgets/log-entry/log-entry";
import Spinner from "../../../../widgets/spinner/spinner";
import Session from "../../../interfaces/session";
import { RouteReactiveComponent } from "../../../route-reactive-component";
import "./text-logs.css";

export default class TextLogs extends RouteReactiveComponent<any, any> {


  protected componentUpdated(): void {
    this.initializeLogs();
  }

  fetchTextLogs() {
    SessionApi.getTextLogsForSession(this.props.session.session_id).then(
      (result) => {
        this.setState({
          logs: result.result.rows,
          loading: false,
        });
        if (this.props.session.is_completed) {
          this.clearPolling();
        }
      },
    );
  }

  clearPolling() {
    if (this.polling) {
      clearInterval(this.polling);
    }
  }

  getLogEntries() {
    return React.Children.toArray(
      this.state.logs
        .filter((l: any) => {
          return this.state.showExceptions ? l.is_error : true;
        })
        .map((l: any) => {
          return (
            <LogEntry
              key={l}
              log={l}
              showScreenShots={this.state.showScreenShots}
            />
          );
        }),
    );
  }
}

const Container = styled.div``;

type PropsType = {
  session: Session;
};

export default function SessionTextLogs(props: PropsType) {
  const { session } = props; 
  const isLoading =

  if (this.state.loading) {
      return (
        <div className="session-text-logs__wrapper">
          <div className="loading-container">
            <Spinner />
            Loading..
          </div>
        </div>
      );
    }

  return (
    <Container>
      <div className="session-text-logs__wrapper">
        <div className="session-text-logs__filter_container">
          <div className="session-text-logs__filter_input_wrapper">
            <CheckBox
              label="Show Images"
              checked={this.state.showScreenShots}
              onValueChanged={this.toggleScreenShots.bind(this)}
            />
            <CheckBox
              label="Show Errors Only"
              checked={this.state.showExceptions}
              onValueChanged={this.toggleExceptions.bind(this)}
            />
          </div>
        </div>
        <div className="session-text-logs__scroll_container">
          {this.getLogEntries()}{" "}
          <div className="session-text-logs__bottom_padding_container" />
        </div>
      </div>
    </Container>
  );
}
