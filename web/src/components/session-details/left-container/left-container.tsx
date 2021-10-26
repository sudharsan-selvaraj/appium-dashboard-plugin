import React from "react";
import SessionCapabilityDetails from "../capability-details/session-capability-details";
import VideoPlayer from "../video-player/video-player";
import "./left-container.css";
export default class LeftDetailsContainer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  getVideoPlayer() {
    if (this.props.session.video_path) {
      //let videoUrl = `${window.location.origin}/dashboard/api/sessions/${this.props.session.session_id}/video`;
      let videoUrl = `http://localhost:4723/dashboard/api/sessions/${this.props.session.session_id}/video`;
      return <VideoPlayer video_path={videoUrl} />;
    } else if (!this.props.session.is_completed) {
      return (
        <div className="no-video__banner">
          <div className="no-video__banner_text">Video will be available once the execution is completed</div>
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
