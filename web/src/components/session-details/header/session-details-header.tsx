import React from "react";
import "./session-details-header.css";
import safari from "../../../assets/safari.svg";
import ios from "../../../assets/ios.svg";
import android from "../../../assets/android.svg";
import Moment from "react-moment";
import CommonUtils from "../../../utils/common-utils";

export default class SessionDetailsHeader extends React.Component<any, any> {
  private headerProperties: any[] = [
    [
      {
        label: "Session ID",
        key: "session_id",
      },
      {
        label: "OS",
        key: "platform_name",
        icon: (session: any) => {
          if (session.platform_name.toLowerCase() == "android") {
            return <img src={android} />;
          } else {
            return <img src={ios} />;
          }
        },
      },
      {
        label: "Os Version",
        key: "platform_version",
      },
    ],
    [
      {
        label: "Start Time",
        formatValue: (session: any) => {
          return (
            <Moment format="DD-MMM-YYYY HH:mm:ss">{session.start_time}</Moment>
          );
        },
      },
      {
        label: "End Time",
        formatValue: (session: any) => {
          return session.end_time ? (
            <Moment format="DD-MMM-YYYY HH:mm:ss">{session.end_time}</Moment>
          ) : (
            "-"
          );
        },
      },
      {
        label: "Duration",
        formatValue: (session: any) => {
          return CommonUtils.convertTimeToReadableFormat(
            new Date(session.start_time),
            session.end_time ? new Date(session.end_time) : new Date(),
          );
        },
      },
    ],
    [
      {
        label: "Device Name",
        key: "device_name",
      },
      {
        label: "UDID",
        key: "udid",
      },
      {
        or: [
          {
            label: "App",
            key: "app",
            formatValue: (session: any) => {
              return session.app.split("/").pop();
            },
          },
          {
            label: "Browser",
            key: "browser_name",
            icon: () => {
              return <img src={safari} />;
            },
          },
        ],
      },
    ],
  ];

  constructor(props: any) {
    super(props);
  }

  getHeaderRow(rowEntries: any[]) {
    return React.Children.toArray(
      rowEntries.map((entry: any) => {
        if (entry.or) {
          entry = entry.or.filter((e: any) => !!this.props.session[e.key])[0];
        }
        if (!entry) {
          return;
        }
        if (entry.formatValue && typeof entry.template == "function") {
          return entry.formatValue(this.props.session);
        }
        return (
          <div className="session-details__header_column_row" key={entry.label}>
            <div className="session-details__header_column_label">
              {entry.label}:
            </div>
            <div className="session-details__header_column_value">
              {entry.icon && (
                <div className="session-details__header_column_value_icon">
                  {entry.icon(this.props.session)}
                </div>
              )}
              {entry.formatValue
                ? entry.formatValue(this.props.session)
                : this.props.session[entry.key]}
            </div>
          </div>
        );
      }),
    );
  }

  render() {
    return (
      <div className="session-details__header">
        {React.Children.toArray(
          this.headerProperties.map((entries) => {
            return (
              <div className="session-details__header_column" key={entries}>
                {this.getHeaderRow(entries)}
              </div>
            );
          }),
        )}
      </div>
    );
  }
}
