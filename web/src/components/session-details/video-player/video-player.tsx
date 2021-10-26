import React from "react";
import "./video-player.css";

export default class VideoPlayer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="player-wrapper">
        <video className="react-player" src={this.props.video_path} width={480} height={600} controls={true} />
      </div>
    );
  }
}
