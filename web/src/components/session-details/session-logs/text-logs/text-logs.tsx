import React from "react";
import { ApiService } from "../../../../services/api";
import CheckBox from "../../../../widgets/check-box/checkbox";
import LogEntry from "../../../../widgets/log-entry/log-entry";
import Spinner from "../../../../widgets/spinner/spinner";
import { RouteReactiveComponent } from "../../../route-reactive-component";
import "./text-logs.css";

export default class TextLogs extends RouteReactiveComponent<any, any> {
  private polling: any;
  constructor(props: any) {
    super(props);
    this.state = {
      logs: [],
      loading: true,
      showScreenShots: true,
      showExceptions: false,
    };
  }

  componentDidMount() {
    this.initializeLogs();
  }

  componentWillUnmount() {
    this.clearPolling();
  }

  protected componentUpdated(): void {
    this.initializeLogs();
  }

  initializeLogs() {
    this.setState({ loading: true, showScreenShots: true, showExceptions: false });
    this.fetchTextLogs();
    this.clearPolling();
    this.polling = setInterval(this.fetchTextLogs.bind(this), 5000);
  }

  fetchTextLogs() {
    ApiService.getTextLogsForSession(this.props.session.session_id).then((result) => {
      this.setState({
        logs: result.rows,
        loading: false,
      });
      if (this.props.session.is_completed) {
        this.clearPolling();
      }
    });
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
          return <LogEntry log={l} showScreenShots={this.state.showScreenShots} />;
        })
    );
  }

  toggleScreenShots(status: any) {
    this.setState({
      showScreenShots: status,
    });
  }

  toggleExceptions(status: any) {
    this.setState({
      showExceptions: status,
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="session-text-logs__wrapper">
          <div className="loading-container">
            <Spinner />
            Loading..
          </div>
        </div>
      );
    } else {
      return (
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
            {this.getLogEntries()} <div className="session-text-logs__bottom_padding_container" />
          </div>
        </div>
      );
    }
  }
}
