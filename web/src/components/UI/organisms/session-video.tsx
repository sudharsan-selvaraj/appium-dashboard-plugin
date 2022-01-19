import React from "react";
import Session from "../../../interfaces/session";
import CommonUtils from "../../../utils/common-utils";
import VideoPlayer from "../atoms/video-player";
import styled from "styled-components";
import EmptyMessage from "../molecules/empty-message";
import Centered from "../molecules/centered";

const Container = styled.div``;

const EmptyVideoContainer = styled.div`
  height: 400px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & p {
    text-align: center;
  }
`;

type PropsType = {
  session: Session;
};

const getVideoNotFoundMessage = (session: Session) => {
  if (session.is_completed) {
    return "Error occured while saving the video";
  } else {
    return "Video will be available once the execution is completed";
  }
};

export default function SessionVideo(props: PropsType) {
  const { session } = props;
  return (
    <Container>
      {session.video_path ? (
        <VideoPlayer url={CommonUtils.getVideoForSession(session.session_id)} />
      ) : (
        <EmptyVideoContainer>
          <EmptyMessage>{getVideoNotFoundMessage(session)}</EmptyMessage>
        </EmptyVideoContainer>
      )}
    </Container>
  );
}
