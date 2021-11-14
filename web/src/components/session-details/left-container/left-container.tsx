import React from "react";
import CommonUtils from "../../../utils/common-utils";
import SessionCapabilityDetails from "../capability-details/session-capability-details";
import VideoPlayer from "../video-player/video-player";
import "./left-container.css";
export default class LeftDetailsContainer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  getVideoPlayer() {
    if (this.props.session.video_path) {
      return (
        <VideoPlayer
          video_path={CommonUtils.getVideoForSession(
            this.props.session.session_id,
          )}
        />
      );
    } else if (!this.props.session.is_completed) {
      return (
        <div className="no-video__banner">
          <div className="no-video__banner_text">
            Video will be available once the execution is completed
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="left-container__wrapper">
        {this.getVideoPlayer()}
        <SessionCapabilityDetails session={this.props.session} />
      </div>
    );
  }
}
