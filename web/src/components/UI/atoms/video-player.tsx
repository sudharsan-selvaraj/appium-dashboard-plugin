import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 10px;
`;

const StyledVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

type PropsType = {
  url: string;
  height?: number;
  width?: number;
};

export default function VideoPlayer(props: PropsType) {
  const { url, width } = props;
  return (
    <Container>
      <StyledVideo
        className="react-player"
        src={url}
        width={width || "100%"}
        controls={true}
      />
    </Container>
  );
}
