import React from "react";
import ArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import CommonUtils from "../../utils/common-utils";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

import "./log-entry.css";
import { ApiService } from "../../services/api";
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
          <div className="text-log-params-title">{logTitle}</div>
          <div className="text-log-string-value">{logBody.value != null ? logBody.value.toString() : "null"}</div>
        </div>
      );
    } else if (Array.isArray(logBody.value)) {
      return (
        <div className="text-log-params-container">
          <div className="text-log-params-title">{logTitle}</div>
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
    return this.getLogBody("Params", this.props.log.params);
  }

  toggleExpand(expandStatus: boolean) {
    this.setState({
      expanded: expandStatus,
    });
  }

  getDuration() {
    if (!this.props.log.start_time || !this.props.log.end_time) {
      return "";
    } else {
      let time = CommonUtils.convertTimeToReadableFormat(
        new Date(this.props.log.start_time),
        new Date(this.props.log.end_time)
      )
        .replace(/hrs|hr/g, "h")
        .replace(/mins|min/g, "m")
        .replace(/secs|sec/g, "s");
      return time;
    }
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
          <div className="text-log-title__right-container">
            {this.getDuration() != "" && (
              <div className="text-log-title__duration">
                <AccessTimeIcon />
                {this.getDuration()}
              </div>
            )}
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
        </div>
        {this.props.log.response != null && <div className="text-log-row">{this.getResponseElement()}</div>}

        {this.props.log.params != null && this.state.expanded && (
          <div className="text-log-row">{this.getParamsElement()}</div>
        )}

        {this.props.showScreenShots && this.props.log.screen_shot != null && (
          <a
            className="text-log-screenshot__link"
            target="blank"
            href={ApiService.getScreenshotForLog(this.props.log.session_id, this.props.log.log_id)}
          >
            <img
              className="text-log-screenshot"
              src={ApiService.getScreenshotForLog(this.props.log.session_id, this.props.log.log_id)}
            />
          </a>
        )}
      </div>
    );
  }
}
