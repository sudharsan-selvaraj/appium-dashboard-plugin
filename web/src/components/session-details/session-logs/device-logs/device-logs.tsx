import React from "react";
import { ApiService } from "../../../../services/api";
import Spinner from "../../../../widgets/spinner/spinner";
import { RouteReactiveComponent } from "../../../route-reactive-component";
import SearchIcon from "@material-ui/icons/Search";
import "./device-logs.css";

export default class DeviceLogs extends RouteReactiveComponent<any, any> {
  private polling: any;
  constructor(props: any) {
    super(props);
    this.state = {
      logs: [],
      loading: true,
      filterText: "",
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
    this.fetchTextLogs();
    this.clearPolling();
    this.polling = setInterval(this.fetchTextLogs.bind(this), 5000);
  }

  fetchTextLogs() {
    ApiService.getDeviceLogsForSession(this.props.session.session_id).then((result) => {
      this.setState({
        logs: result.result.rows,
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
        .filter((l: any) => l.message.indexOf(this.state.filterText) >= 0)
        .map((l: any) => {
          return (
            <div className="console-log-line" key={l.message}>
              {l.message}
            </div>
          );
        }),
    );
  }

  filterLogs(filterText: string) {
    this.setState({
      filterText: filterText,
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="session-device-logs__wrapper">
          <div className="loading-container">
            <Spinner />
            Loading..
          </div>
        </div>
      );
    } else {
      return (
        <div className="session-device-logs__wrapper">
          <div className="session-device-logs__filter_container">
            <div className="session-device-logs__filter_wrapper">
              <SearchIcon />
              <input
                type="text"
                placeholder="Filter logs"
                onChange={(e) => this.filterLogs(e.target.value)}
              />
            </div>
          </div>
          <div className="session-device-logs__scroll_container">
            {this.getLogEntries()}
            <div className="console-log-line"></div>
          </div>
        </div>
      );
    }
  }
}
