import React from "react";
import styled from "styled-components";

const Container = styled.div``;

type PropsType = {
  url: string;
  height?: number;
  width?: number;
};

export default function VideoPlayer(props: PropsType) {
  const { height, url, width } = props;
  return (
    <Container>
      <video
        className="react-player"
        src={url}
        width={width | 480}
        height={height | 600}
        controls={true}
      />
    </Container>
  );
};
