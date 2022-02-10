import React from "react";
import Session from "../../../interfaces/session";
import CommonUtils from "../../../utils/common-utils";
import VideoPlayer from "../atoms/video-player";
import styled from "styled-components";
import EmptyMessage from "../molecules/empty-message";

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

const getVideoNotFoundMessage = (session: Session) => {
  if (session.is_completed) {
    return "Error occured while saving the video";
  } else {
    return "Video will be available once the execution is completed";
  }
};

export default function SessionVideo(props: PropsType) {
  const { session, height } = props;
  return (
    <Container>
      {session.video_path ? (
        <VideoPlayer
          url={CommonUtils.getVideoForSession(session.session_id)}
          height={height}
        />
      ) : (
        <EmptyVideoContainer height={height}>
          <EmptyMessage>{getVideoNotFoundMessage(session)}</EmptyMessage>
        </EmptyVideoContainer>
      )}
    </Container>
  );
}
