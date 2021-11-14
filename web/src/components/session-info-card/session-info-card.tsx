import React from "react";
import "./session-info-card.css";
import Spinner from "../../widgets/spinner/spinner";
import SuccessIcon from "../../widgets/success-icon/success-icon";
import ErrorIcon from "../../widgets/error-icon/error-icon";
import PhoneAndroidSharpIcon from "@material-ui/icons/PhoneAndroidSharp";
import CommonUtils from "../../utils/common-utils";
import ios from "../../assets/ios.svg";
import android from "../../assets/android.svg";
import safari from "../../assets/safari.svg";

class SessionInfoCard extends React.Component<any, any> {
  private elementRef: any = React.createRef();
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    if (this.props.isActive) {
      this.elementRef.current.scrollIntoView();
    }
  }

  getStausClass() {
    return this.props.session.session_status.toLowerCase() == "passed"
      ? "success"
      : "failure";
  }

  getStausIcon() {
    return !this.props.session.is_completed ? (
      <Spinner />
    ) : this.getStausClass() == "success" ? (
      <SuccessIcon />
    ) : (
      <ErrorIcon />
    );
  }

  getPlatformIcon() {
    const os: string = this.props.session.platform_name.toLowerCase();
    return {
      android: <img src={android} />,
      ios: <img src={ios} />,
    }[os] as any;
  }

  getBrowserIcon() {
    const browser: string = this.props.session.browser_name.toLowerCase();
    return {
      safari: <img src={safari} />,
    }[browser] as any;
  }

  getExecutioTime() {
    const time = CommonUtils.convertTimeToReadableFormat(
      new Date(this.props.session.start_time),
      new Date(),
    );
    if (!time.includes("min") && !time.includes("hr")) {
      return "few seconds ago";
    } else {
      return `${time.replace(/[0-9]{1,} (secs|sec)/g, "")} ago`;
    }
  }

  render() {
    return (
      <div
        ref={this.elementRef}
        className={`session-info-card__wrapper ${
          this.props.isActive ? "active" : ""
        }`}
        onClick={() => {
          this.props.onCardClicked(this.props.session.session_id);
        }}
      >
        <div className="session-info-card__item">
          <div className="session-info-card__title">
            {this.props.session.session_id}
          </div>
          <div className="session-info-card__details_wrapper">
            <div className="session-info-card__platform entry">
              <div className="device-icon">{this.getPlatformIcon()}</div>v
              {this.props.session.platform_version}
            </div>
            <div className="session-info-card__device_name entry">
              <div className="device-icon">
                <PhoneAndroidSharpIcon />
              </div>
              <span>{this.props.session.device_name}</span>
            </div>
          </div>
          <div className="session-info-card__details_wrapper">
            {this.props.session.is_completed && (
              <div
                className={`session-info-card__status entry ${this.getStausClass()}`}
              >
                {this.props.session.session_status}
              </div>
            )}
            <div className="session-info-card__time">
              {this.getExecutioTime()}
            </div>
            {this.props.session.browser_name && (
              <div className="session-info-card__platform">
                <div className="device-icon">{this.getBrowserIcon()}</div>
                {this.props.session.browser_name}
              </div>
            )}
          </div>
        </div>
        <div className="session-info-card__status_icon">
          {this.getStausIcon()}
        </div>
      </div>
    );
  }
}

export default SessionInfoCard;
