import React from "react";
import { ApiService } from "../../../../services/api";
import Spinner from "../../../../widgets/spinner/spinner";
import { RouteReactiveComponent } from "../../base-component-class";
import "./device-logs.css";

export default class DeviceLogs extends RouteReactiveComponent<any, any> {
  private polling: any;
  constructor(props: any) {
    super(props);
    this.state = {
      logs: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.initializeLogs();
  }

  protected componentUpdated(): void {
    this.initializeLogs();
  }

  initializeLogs() {
    this.fetchTextLogs();
    this.clearPolling();
    this.polling = setInterval(this.fetchTextLogs.bind(this), 5000);
  }

  fetchTextLogs() {
    ApiService.getDeviceLogsForSession(this.props.session.session_id).then((result) => {
      this.setState({
        logs: result.rows,
        loading: false,
      });
      console.log(this.props.session.session_id + "===" + this.props.session.is_completed);
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
      this.state.logs.map((l: any) => {
        return <div className="console-log-line">{l.message}</div>;
      })
    );
  }

  // toggleScreenShots(status: any) {
  //   this.setState({
  //     showScreenShots: status,
  //   });
  // }

  // toggleExceptions(status: any) {
  //   this.setState({
  //     showExceptions: status,
  //   });
  // }

  render() {
    if (this.state.loading) {
      return <Spinner />;
    } else {
      return (
        <div className="session-device-logs__wrapper">
          <div className="session-device-logs__scroll_container">
            {this.getLogEntries()}
            <div className="console-log-line"></div>
          </div>
        </div>
      );
    }
  }
}
