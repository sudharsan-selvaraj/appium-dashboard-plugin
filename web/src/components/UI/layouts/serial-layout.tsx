import { JSXElement } from "@babel/types";
import React from "react";
import styled from "styled-components";

const RowContainer = styled.div<{ height?: string }>`
  height: ${(props) => props.height};
  display: flex;

  & > * {
    height: 100%;
    width: 100%;
  }
`;

type RowType = {
  className?: string;
  children: JSX.Element;
  height?: string;
};

export function Row(props: RowType) {
  const { children, className, height } = props;
  return (
    <RowContainer className={className} height={height}>
      {children}
    </RowContainer>
  );
}

const Container = styled.div``;

type SerialLayouttype = {
  className?: string;
  children: JSX.Element[] | JSX.Element;
};

export default function SerialLayout(props: SerialLayouttype) {
  const { children, className } = props;
  return <Container className={className}>{children}</Container>;
}
