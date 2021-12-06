import { JSXElement } from "@babel/types";
import React from "react";
import styled from "styled-components";

const RowContainer = styled.div<{
  height?: string;
  padding?: string;
  scrollable?: boolean;
  align?: string;
}>`
  height: ${(props) => props.height};
  display: flex;
  padding: ${(props) => props.padding};
  text-align: ${(props) => props.align};
  ${(props) => (props.scrollable ? "overflow: auto" : "")};

  & > * {
    height: 100%;
    width: 100%;
  }
`;

type RowPropsType = {
  className?: string;
  children: JSX.Element;
  height?: string;
  padding?: string;
  scrollable?: boolean;
  align?: "center" | "left" | "right";
};

export function Row(props: RowPropsType) {
  const { children, className, height, padding, scrollable, align } = props;
  return (
    <RowContainer
      className={className}
      height={height}
      padding={padding}
      scrollable={scrollable}
      align={align}
    >
      {children}
    </RowContainer>
  );
}

const Container = styled.div``;

type SerialLayouttype = {
  className?: string;
  children: Array<JSX.Element | null> | JSX.Element;
};

export default function SerialLayout(props: SerialLayouttype) {
  const { children, className } = props;
  return <Container className={className}>{children}</Container>;
}
