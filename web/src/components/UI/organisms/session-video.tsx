import React, { useCallback, useEffect, useState } from "react";
import Session from "../../../interfaces/session";
import CommonUtils from "../../../utils/common-utils";
import VideoPlayer from "../atoms/video-player";
import styled from "styled-components";
import EmptyMessage from "../molecules/empty-message";
import Spinner from "../atoms/spinner";

const Container = styled.div``;

const EmptyVideoContainer = styled.div<{ height: number }>`
  height: ${(props) => props.height}px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  /* box shadow*/
  -webkit-box-shadow: 0px 10px 10px -10px #000000;
  -moz-box-shadow: 0px 10px 10px -10px #000000;
  box-shadow: 0px 10px 10px -10px #000000;

  & p {
    text-align: center;
  }
`;

type PropsType = {
  session: Session;
  height: number;
};

const LiveVideoContainer = styled.div<{ height: number }>`
  height: ${(props) => props.height}px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const VideoImg = styled.img<{ height: number; hide: boolean }>`
  height: ${(props) => props.height - 18}px;
  widht: 100%;
  object-fit: scale-down;
  top: 10px;
  left: 10px;
  border: 1px solid ${(props) => props.theme.colors.border};
  display: ${(props) => (!!props.hide ? "none" : "block")};
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-tems: center;
`;

const LiveBadge = styled.span`
  color: red;
  position: absolute;
  top: 10px;
  right: 10px;
  font-weight: 500;

  @keyframes blink {
    20% {
      opacity: 0.8;
    }
    40% {
      opacity: 0.4;
    }
    60% {
      opacity: 0;
    }
    80% {
      opacity: 0.4;
    }
    100% {
      opacity: 0.8;
    }
  }

  &::before {
    content: "";
    display: inline-block;
    background: red;
    margin-right: 5px;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    animation: blink 1s step-start 0s infinite;
  }
`;

const getVideoNotFoundMessage = (session: Session) => {
  if (session.is_completed) {
    return "Error occured while saving the video";
  } else {
    return "Video will be available once the execution is completed";
  }
};

export default function SessionVideo(props: PropsType) {
  const { session, height } = props;
  const [liveStreamLoading, setLiveStreamLoading] = useState(true);
  const [liveStreamError, setLiveStreamError] = useState(false);

  const imageLoaded = useCallback((errored: boolean) => {
    setLiveStreamLoading(false);
    setLiveStreamError(errored);
  }, []);

  useEffect(() => {
    setLiveStreamLoading(true);
    setLiveStreamError(false);
  }, [session.session_id, session.session_status]);

  const getStreamingVideo = () => {
    if (!session.is_completed && !!session.live_stream_port) {
      return (
        <LiveVideoContainer height={height}>
          {liveStreamLoading && (
            <LoadingContainer>
              <Spinner />
              <EmptyMessage>Loading live video..</EmptyMessage>
            </LoadingContainer>
          )}
          {liveStreamError && (
            <EmptyVideoContainer height={height}>
              <EmptyMessage>Unable to render live video</EmptyMessage>
            </EmptyVideoContainer>
          )}
          <VideoImg
            src={CommonUtils.getLiveVideoForSession(session.session_id)}
            height={height}
            onLoad={() => imageLoaded(false)}
            onError={() => imageLoaded(true)}
            hide={liveStreamLoading || liveStreamError}
          />
          {!liveStreamLoading && !liveStreamError && (
            <LiveBadge>LIVE</LiveBadge>
          )}
        </LiveVideoContainer>
      );
    } else {
      return (
        <EmptyVideoContainer height={height}>
          <EmptyMessage>{getVideoNotFoundMessage(session)}</EmptyMessage>
        </EmptyVideoContainer>
      );
    }
  };

  return (
    <Container>
      {session.video_path ? (
        <VideoPlayer
          url={CommonUtils.getVideoForSession(session.session_id)}
          height={height}
        />
      ) : (
        getStreamingVideo()
      )}
    </Container>
  );
}
