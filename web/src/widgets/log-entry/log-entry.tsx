import React from "react";
import ArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import "./log-entry.css";
export default class LogEntry extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasExpandableContent: !!this.props.log.params,
      isExpanded: this.props.expand || false,
    };
  }

  getLogBody(logTitle: string, logBody: any) {
    if (logBody.type == "string" || logBody.value == null) {
      return (
        <div className="text-log-params-container">
          <div className="text-log-string-value">{logBody.value ? logBody.value.toString() : "null"}</div>
        </div>
      );
    } else if (Array.isArray(logBody.value)) {
      return (
        <div className="text-log-params-container">
          <div className="text-log-json-value">{JSON.stringify(logBody.value)}</div>
        </div>
      );
    } else if (logBody.type == "error") {
      return (
        <div className="text-log-error-container">
          <span className="text-log-params-json-entry-key">{logBody.value.error}:</span>
          <div className="text-log-json-value">{logBody.value.message}</div>
        </div>
      );
    } else {
      return (
        <div className="text-log-params-container">
          <div className="text-log-params-title">{logTitle}</div>
          {React.Children.toArray(
            Object.keys(logBody.value).map((k) => {
              return (
                <div className="text-log-params-json-row">
                  <div className="text-log-params-json-entry-key">{k}:</div>
                  <div className="text-log-params-json-entry-value">{logBody.value[k].toString()}</div>
                </div>
              );
            })
          )}
        </div>
      );
    }
  }

  getResponseElement() {
    return this.getLogBody("Response", this.props.log.response);
  }

  getParamsElement() {
    return this.getLogBody(
      "Params",
      Object.assign({
        type: "object",
        value: this.props.log.params,
      })
    );
  }

  toggleExpand(expandStatus: boolean) {
    this.setState({
      expanded: expandStatus,
    });
  }

  render() {
    return (
      <div
        className={`text-log-entry__wrapper ${this.props.log.is_error ? "warning" : ""} ${
          this.state.hasExpandableContent ? "expandable" : ""
        }`}
        onClick={() => this.toggleExpand(this.state.hasExpandableContent && !this.state.expanded)}
      >
        <div className="text-log-row">
          <div className="text-log-title__wrapper">
            <div className="text-log-entry__title">{this.props.log.title}</div>
            <div className="text-log-entry__title-info">{this.props.log.title_info}</div>
          </div>
          {this.state.hasExpandableContent && (
            <div className="expand-icon">
              {this.state.expanded ? (
                <ArrowUpIcon onClick={() => this.toggleExpand(false)} />
              ) : (
                <ArrowDownIcon onClick={() => this.toggleExpand(true)} />
              )}
            </div>
          )}
        </div>
        {this.props.log.response != null && <div className="text-log-row">{this.getResponseElement()}</div>}

        {this.props.log.params != null && this.state.expanded && (
          <div className="text-log-row">{this.getParamsElement()}</div>
        )}

        {this.props.showScreenShots && this.props.log.screen_shot != null && (
          <img
            className="text-log-screenshot"
            src={`http://localhost:4723/dashboard/api/sessions/${this.props.log.session_id}/log/${this.props.log.log_id}/screen-shot`}
          />
        )}
      </div>
    );
  }
}
