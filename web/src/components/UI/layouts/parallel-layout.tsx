import { JSXElement } from "@babel/types";
import React from "react";
import styled from "styled-components";

const GIRD_SIZE = 100 / 12;
const ColumnContainer = styled.div<{ grid: number }>`
  flex-basis: ${(props) => GIRD_SIZE * props.grid}%;
  display: flex;

  & > * {
    height: 100%;
    width: 100%;
  }
`;

type ColumnProps = {
  children: JSX.Element;
  className?: string;
  grid: number;
};

export function Column(props: ColumnProps) {
  const { children, className, grid } = props;
  return (
    <ColumnContainer className={className} grid={grid}>
      {children}
    </ColumnContainer>
  );
}

const Container = styled.div`
  display: flex;
`;

type ParallelLayoutType = {
  className?: string;
  children: JSX.Element;
};

export default function ParallelLayout(props: ParallelLayoutType) {
  const { children, className } = props;
  return <Container className={className}>{children}</Container>;
}
