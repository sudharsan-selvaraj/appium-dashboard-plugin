import React from "react";
import "./debug-log-entry.css";
import ArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Moment from "react-moment";
import CodeViewer from "../../../../../widgets/code-viewer/code-viewer";

export default class DebugLogEntry extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  toggleExpand(status: boolean) {
    this.setState({
      expanded: status,
    });
  }

  render() {
    return (
      <div
        className={`session-debug-log__entry ${this.props.log.args ? "expandable" : ""}`}
        onClick={() => this.toggleExpand(!this.state.expanded)}
      >
        <div className="session-debug-log__entry-row">
          <div className="session-debug-log__title_wrapper">
            <div className="session-debug-log__time">
              <Moment format="DD-MM-YYYY HH:mm:ss">{this.props.log.timestamp}</Moment>
            </div>
            <div className="session-debug-log__message">{this.props.log.message}</div>
          </div>
          <div className="session-test-title__right-container">
            {this.props.log.args && (
              <div className="expand-icon">
                {this.state.expanded ? (
                  <ArrowUpIcon onClick={() => this.toggleExpand(false)} />
                ) : (
                  <ArrowDownIcon onClick={() => this.toggleExpand(true)} />
                )}
              </div>
            )}
          </div>
        </div>
        {this.props.log.args && this.state.expanded && (
          <div className="session-debug-log__entry-row">
            <div className="session-debug-log__args-wrapper">
              <CodeViewer code={JSON.stringify(this.props.log.args, null, 2)} language={"json"} />
            </div>
          </div>
        )}
      </div>
    );
  }
}
