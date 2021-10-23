import React from "react";
import VideoPlayer from "../video-player/video-player";
import "./left-container.css";
export default class LeftDetailsContainer extends React.Component {
  render() {
    return (
      <div className="left-container__wrapper">
        <VideoPlayer />
      </div>
    );
  }
}
