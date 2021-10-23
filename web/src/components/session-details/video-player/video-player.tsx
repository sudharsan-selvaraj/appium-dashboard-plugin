import React from "react";
import { Player, BigPlayButton } from "video-react";
import "./video-player.css";

export default class VideoPlayer extends React.Component {
  render() {
    return (
      <Player preload="none">
        <source src="https://automate.browserstack.com/s3-upload/bs-video-logs-euw/s3.eu-west-1/5794024fca3bffe95e3a49304d2efb3d9f7d2ac6/video-5794024fca3bffe95e3a49304d2efb3d9f7d2ac6.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2XUQHUQMO7GCCO5F%2F20211023%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20211023T073428Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=d74f71b35a5dbed85f605d8a8591c5652225259d5cc6e2055a398753aba054fd" />
        <BigPlayButton position="center" />
      </Player>
    );
  }
}
