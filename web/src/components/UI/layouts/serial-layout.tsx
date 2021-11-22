import { JSXElement } from "@babel/types";
import React from "react";
import styled from "styled-components";

const RowContainer = styled.div<{
  height?: string;
  padding?: string;
  scrollable?: boolean;
}>`
  height: ${(props) => props.height};
  display: flex;
  padding: ${(props) => props.padding};
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
};

export function Row(props: RowPropsType) {
  const { children, className, height, padding, scrollable } = props;
  return (
    <RowContainer
      className={className}
      height={height}
      padding={padding}
      scrollable={scrollable}
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
