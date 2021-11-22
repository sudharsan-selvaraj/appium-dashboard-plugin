import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 10px;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 300px;
`;

type PropsType = {
  url: string;
  height?: number;
  width?: number;
};

export default function VideoPlayer(props: PropsType) {
  const { height, url, width } = props;
  return (
    <Container>
      <StyledVideo
        className="react-player"
        src={url}
        width={width || "100%"}
        height={height || 600}
        controls={true}
      />
    </Container>
  );
}
