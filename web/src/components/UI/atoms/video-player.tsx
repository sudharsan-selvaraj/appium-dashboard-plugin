import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 10px;
`;

const StyledVideo = styled.video`
  background: #c9c7c7;
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
        height={height || "600px"}
        controls={true}
      />
    </Container>
  );
}
