import React from "react";
import styled from "styled-components";
import Animation from "./animation";

const Container = styled.div<{ size?: keyof typeof Sizes }>`
  width: ${(props) => {
    switch (props.size) {
      case "M":
        return "50px";
      case "M":
        return "100px";
      case "M":
        return "200px";
      default:
        return "100px";
    }
  }};
`;

export enum Sizes {
  "M" = "M",
  "L" = "L",
  "XL" = "XL",
}

type PropsType = {
  size?: keyof typeof Sizes;
};

export default function Spinner(props: PropsType) {
  const { size } = props;
  return (
    <Container size={size}>
      <Animation name="spinner" />
    </Container>
  );
}
