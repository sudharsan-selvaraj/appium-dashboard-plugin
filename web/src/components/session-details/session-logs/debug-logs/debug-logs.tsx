import React from "react";
import { ApiService } from "../../../../services/api";
import Spinner from "../../../../widgets/spinner/spinner";
import { RouteReactiveComponent } from "../../../route-reactive-component";
import DebugLogEntry from "./debug-log-entry/debug-log-entry";
import SearchIcon from "@material-ui/icons/Search";
import "./debug-logs.css";

export default class DebugLogs extends RouteReactiveComponent<any, any> {
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

  protected componentUpdated(): void {
    this.initializeLogs();
  }

  initializeLogs() {
    this.fetchTextLogs();
    this.clearPolling();
    this.polling = setInterval(this.fetchTextLogs.bind(this), 5000);
  }

  fetchTextLogs() {
    ApiService.getDebugLogsForSession(this.props.session.session_id).then((result) => {
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
          return <DebugLogEntry log={l} />;
        })
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
        <div className="session-debug-logs__wrapper">
          <div className="loading-container">
            <Spinner />
            Loading..
          </div>
        </div>
      );
    } else if (this.state.logs.length === 0) {
      return (
        <div className="session-debug-logs__wrapper">
          <div className="loading-container">No Logs available</div>
        </div>
      );
    } else {
      return (
        <div className="session-debug-logs__wrapper">
          <div className="session-debug-logs__filter_container">
            <div className="session-debug-logs__filter_wrapper">
              <SearchIcon />
              <input type="text" placeholder="Filter logs" onChange={(e) => this.filterLogs(e.target.value)} />
            </div>
          </div>
          <div className="session-debug-logs__scroll_container">
            {this.getLogEntries()}
            <div className="session-debug-logs__bottom_padding_container"></div>
          </div>
        </div>
      );
    }
  }
}
