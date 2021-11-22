import React from "react";
import Session from "../../../interfaces/session";
import CommonUtils from "../../../utils/common-utils";
import VideoPlayer from "../atoms/video-player";
import styled from "styled-components";
import EmptyMessage from "../molecules/empty-message";

const Container = styled.div``;

type PropsType = {
  session: Session;
};

export default function SessionVideo(props: PropsType) {
  const { session } = props;
  return (
    <Container>
      {session.video_path ? (
        <VideoPlayer url={CommonUtils.getVideoForSession(session.session_id)} />
      ) : (
        <EmptyMessage>
          Video will be available once the execution is completed
        </EmptyMessage>
      )}
    </Container>
  );
}
