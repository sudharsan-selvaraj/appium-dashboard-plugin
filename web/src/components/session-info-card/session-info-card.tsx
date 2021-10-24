import React, { useRef } from "react";
import "./session-info-card.css";
import Spinner from "../../widgets/spinner/spinner";
import SuccessIcon from "../../widgets/success-icon/success-icon";
import ErrorIcon from "../../widgets/error-icon/error-icon";
import AndroidIcon from "../../widgets/android-icon/android-icon";
import AppleIcon from "../../widgets/apple-icon/apple-icon";
import PhoneAndroidSharpIcon from "@material-ui/icons/PhoneAndroidSharp";
import CommonUtils from "../utils/common-utils";

class SessionInfoCard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  getStausClass() {
    return this.props.session.session_status.toLowerCase() == "passed" ? "success" : "failure";
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
    let os: string = this.props.session.platform_name.toLowerCase();
    return {
      android: <AndroidIcon />,
      ios: <AppleIcon />,
    }[os] as any;
  }

  getExecutioTime() {
    if (this.props.session.end_time) {
      let time = CommonUtils.convertTimeToReadableFormat(
        new Date(this.props.session.start_time),
        new Date(this.props.session.end_time)
      );
      return `Took ${time}`;
    } else {
      let time = CommonUtils.convertTimeToReadableFormat(new Date(this.props.session.start_time), new Date());
      return `Started ${time} ago`;
    }
  }

  render() {
    return (
      <div
        className={`session-info-card__wrapper ${this.props.isActive ? "active" : ""}`}
        onClick={() => {
          this.props.onCardClicked(this.props.session.session_id);
        }}
      >
        <div className="session-info-card__item">
          <div className="session-info-card__title">{this.props.session.session_id}</div>
          <div className="session-info-card__details_wrapper">
            {this.props.session.is_completed && (
              <div className={`session-info-card__status ${this.getStausClass()}`}>
                {this.props.session.session_status}
              </div>
            )}
            <div className="session-info-card__platform">
              <div className="device-icon">{this.getPlatformIcon()}</div>v{this.props.session.platform_version}
            </div>
            <div className="session-info-card__device_name">
              <div className="device-icon">
                <PhoneAndroidSharpIcon />
              </div>
              {this.props.session.device_name}
            </div>
          </div>
          <div className="session-info-card__details_wrapper">
            <div className="session-info-card__time">{this.getExecutioTime()}</div>
          </div>
        </div>
        <div className="session-info-card__status_icon">{this.getStausIcon()}</div>
      </div>
    );
  }
}

export default SessionInfoCard;
