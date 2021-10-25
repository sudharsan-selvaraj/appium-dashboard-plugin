import React from "react";
import { ApiService } from "../../../../services/api";
import LogEntry from "../../../../widgets/log-entry/log-entry";
import Spinner from "../../../../widgets/spinner/spinner";
import { BaseComponent } from "../../base-component-class";
import "./text-logs.css";

export default class TextLogs extends BaseComponent<any, any> {
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
    this.setState({ loading: true });
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
      this.state.logs.map((l: any) => {
        return <LogEntry log={l} />;
      })
    );
  }

  render() {
    if (this.state.loading) {
      return <Spinner />;
    } else {
      return <div className="session--text-logs__wrapper">{this.getLogEntries()}</div>;
    }
  }
}
